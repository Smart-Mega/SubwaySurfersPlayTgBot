import { parseISO } from "date-fns"

export const parseTime = (time: string | Date) => {
  if (typeof time !== "string") {
    return time
  }
  return parseISO(time)
}
