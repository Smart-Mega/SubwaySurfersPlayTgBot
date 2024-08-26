import React, { useEffect, useState, type FC } from "react"

import clsx from "clsx"
import { toast } from "sonner"

import { Image } from "@telegram-apps/telegram-ui"
import { useTonAddress } from '@tonconnect/ui-react';

import ImagePlaceholder from "@/components/ImagePlaceholder"
import PageLayout from "@/components/PageLayout"

import useTaskStore from "@/stores/useTaskStore"
import useReferStore from "@/stores/useReferStore";

import { BiSolidChevronRight } from "react-icons/bi"
import { LuCheck } from "react-icons/lu"
import LoadingOverlay from "@/components/LoadingOverlay";
import CompleteOverlay from "@/components/CompleteOverlay";

const Tasks: FC = () => {
  const taskStore = useTaskStore()
  const referStore = useReferStore()
  
  const rawAddress = useTonAddress(false);

  const [isSuccess, setIsSuccess] = useState(false)
  const [activeTab, setActiveTab] = useState("tasks")
  const [lastDailyReward, setLastDailyReward] = useState<any>()

  const completeObject = React.useCallback((objective:any, onSuccess?:Function) => {
    taskStore.objectiveComplete({
      objective_id: objective.id,
      objective_type: objective.type,
      objective_reward: objective.reward
    }, () => { 
      // toast.success('Done')
      setIsSuccess(true)
      taskStore.refresh()
      if (onSuccess) onSuccess()
    }, () => { 
      toast.error('Failed')
    })
  }, [taskStore, setIsSuccess])

  const onClickHandler = React.useCallback((objective:any) => { 
    if (objective) {
      if (taskStore.completedObjectives?.filter((item: any) => item.task_id === objective.id).length > 0) {
        return toast.warning('Already completed this objective')
      }
      if (objective.type && objective.type === 'link') {
        completeObject(objective, () => {
          window.open(objective.link, '_blank')
        })
      }
      if (objective.type && objective.type === 'wallet') {
        if (rawAddress !== '') {
          completeObject(objective)
        } else {
          toast.warning('Not connected to wallet')
        }
      }
      if (objective.type && objective.type === 'invite') {
        console.log(referStore.refer?.total)
        if (referStore.refer && Number(referStore.refer.total) > 2) {
          completeObject(objective)
        } else {
          toast.warning('Task Incompleted')
        }
      }
    }
  }, [taskStore])

  const onCheckDailyReward = React.useCallback((index: number) => { 
    if (Number(lastDailyReward?.day) === 0 || (Number(lastDailyReward?.day) !== 0 && Number(lastDailyReward?.day) === index) || (!lastDailyReward && index === 0)) {
      if (Number(lastDailyReward?.day) !== 0) {
        const differenceInMilliSeconds = new Date().getTime() - new Date(lastDailyReward?.updated_at).getTime()
        const countOfDays = Math.floor((differenceInMilliSeconds / 1000) / (24 * 3600))
        if (countOfDays === 0) {
          return toast.warning('Not available')
        }
      }
      taskStore.checkDailyRewards(
        () => { 
          setIsSuccess(true)
          taskStore.refresh()
        }, () => { 
          toast.error('Failed')
        })
    } else {
      toast.warning('Not available')
    }
  }, [lastDailyReward, taskStore])

  useEffect(() => {
    setIsSuccess(false)
    taskStore.refresh()
    referStore.refresh()
  }, [])

  useEffect(() => { 
    const lastDailyRewards = taskStore.dailyRewards
    if (lastDailyRewards) {
      setLastDailyReward(lastDailyRewards)
    } else {
      setLastDailyReward(null)
    }
  }, [taskStore.dailyRewards])

  return (
    <PageLayout>
      <section className="relative mb-12">
        <ImagePlaceholder
          className="w-full"
          src="images/tasks-bg.svg"
          alt="Background"
          w={375}
          h={215}
          borderRadius="rounded-t-[30px]"
        />

        <div className="absolute left-0 right-0 top-[41.3%] text-center text-2xl font-semibold text-white">
          {activeTab === "daily" ? "Daily reward" : "7 tasks available"}
        </div>

        <div className="absolute left-0 right-0 top-[61.3%] px-5 text-center text-sm text-white">
          {activeTab === "daily" 
            ? "Collect coins for logging in to the game every day without missing a day." 
            : "We'll reward you immediately with points after each task completion"}
        </div>

        <div className="absolute bottom-0 flex w-full translate-y-[50%] items-center justify-center px-12">
          <button
            className={clsx(
              "h-12 flex-1 rounded-l-full rounded-r-none text-base font-bold text-white",
              activeTab === "tasks" ? "bg-[#242224]" : "bg-[#111111]"
            )}
            onClick={() => setActiveTab("tasks")}
          >
            Tasks
          </button>
          <button
            className={clsx(
              "h-12 flex-1 rounded-l-none rounded-r-full text-base font-bold text-white",
              activeTab === "daily" ? "bg-[#242224]" : "bg-[#111111]"
            )}
            onClick={() => setActiveTab("daily")}
          >
            Check daily
          </button>
        </div>
      </section>

      {activeTab === "tasks" && (
        <section className="mb-10 flex w-full flex-col gap-3 px-5">
          {
            taskStore.objectives?.map((obj: any) => (
              <div
                key={obj.title}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-full bg-[#1A181A] px-4 py-2"
                onClick={() => onClickHandler(obj)}
              >
                <Image
                  className="w-full border-0 shadow-none bg-inherit"
                  src={
                    obj.icon ? `${import.meta.env.VITE_API_STATIC_URL}/${obj.icon}` : ""
                  }
                  alt="SubwaySurfersPlay"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <div className="text-sm text-white">{obj.title}</div>
                  <div className="text-[13px] text-white font-semibold text-yellow-600">{obj.description}</div>
                </div>
                {
                  taskStore.completedObjectives?.filter((item: any) => item.task_id === obj.id).length > 0 ? (
                    <LuCheck className="h-6 text-[#3CF9FB]" />
                  ) : (
                    <BiSolidChevronRight className="h-10 text-[#3CF9FB]" />
                  )
                }
                
                {/* <LuCheck className="h-6 text-[#3CF9FB]" /> */}
              </div>
            ))
          }
          {taskStore.objectives?.length === 0 && (
            <div className="flex flex-1 flex-col items-center justify-center text-xs font-bold text-white">
              Coming Soon...
            </div>
          )}
        </section>
      )}

      {activeTab === "daily" && (
        <section className="mb-10 grid w-full grid-cols-4 gap-2 px-5">
          {[...Array(10).keys()].map((i) => (
            <div
              key={i}
              className="flex w-full h-[102px] bg-[#242224] rounded-xl flex-col items-center gap-2 cursor-pointer relative"
              onClick={((!lastDailyReward && i === 0) || Number(lastDailyReward?.day) === i) ? () => onCheckDailyReward(i) : undefined}
            >
              {Number(lastDailyReward?.day) > i && (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={Number(lastDailyReward?.day) === 0 ? "icons/daily-task.svg" : "icons/daily-task-success.svg"}
                  alt={`Day ${i + 1}`} />
              )}
              {(Number(lastDailyReward?.day) === i) && (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={"icons/daily-task.svg"}
                  alt={`Day ${i + 1}`} />
              )}
              {(!lastDailyReward && i === 0) && (
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={"icons/daily-task.svg"}
                  alt={`Day ${i + 1}`} />
              )}
              <div
                className={clsx(
                  "absolute inset-0 flex justify-center rounded-lg",
                  Number(lastDailyReward?.day) <= i && "bg-black bg-opacity-50"
                )}
              >
                <div className="flex flex-col justify-between">
                  <span className="top-1 pt-3 text-gray-400 text-sm font-bold">
                    {`Day ${i + 1}`}
                  </span>
                  <span className="absolute bottom-1 left-0 right-0 z-50 text-center text-sm font-bold text-gray-400">
                    + {50 * (i + 1)}
                  </span>
                </div>
              </div>
              <div className="hidden absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-black to-transparent"></div>
            </div>
          ))}
        </section>
      )}
      
      {
        taskStore.loading && <LoadingOverlay loading />
      }
      {
        isSuccess && <CompleteOverlay isSuccess onClose={() => setIsSuccess(false)} />
      }
    </PageLayout>
  )
}

export default Tasks
