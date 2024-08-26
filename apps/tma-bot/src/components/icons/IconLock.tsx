import React from "react"

interface Props {
  className?: string
}

export default function IconLock({ className }: Readonly<Props>) {
  return (
    <svg
      className={className}
      width="1em"
      height="1em"
      viewBox="0 0 55 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.3333 6.875H11.4583C10.2428 6.875 9.07697 7.35789 8.21743 8.21743C7.35789 9.07697 6.875 10.2428 6.875 11.4583V18.3333M48.125 18.3333V11.4583C48.125 10.2428 47.6421 9.07697 46.7826 8.21743C45.923 7.35789 44.7572 6.875 43.5417 6.875H36.6667M36.6667 48.125H43.5417C44.7572 48.125 45.923 47.6421 46.7826 46.7826C47.6421 45.923 48.125 44.7572 48.125 43.5417V36.6667M6.875 36.6667V43.5417C6.875 44.7572 7.35789 45.923 8.21743 46.7826C9.07697 47.6421 10.2428 48.125 11.4583 48.125H18.3333"
        stroke="currentColor"
        strokeOpacity="1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.963 26.5833H23.1204C22.5016 26.5833 22 27.1057 22 27.75V31.8333C22 32.4777 22.5016 33 23.1204 33H30.963C31.5817 33 32.0833 32.4777 32.0833 31.8333V27.75C32.0833 27.1057 31.5817 26.5833 30.963 26.5833Z"
        stroke="currentColor"
        strokeOpacity="1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M23.8333 26.5833V24.1389C23.8333 23.3285 24.1714 22.5513 24.773 21.9783C25.3747 21.4053 26.1908 21.0833 27.0417 21.0833C27.8926 21.0833 28.7086 21.4053 29.3103 21.9783C29.912 22.5513 30.25 23.3285 30.25 24.1389V26.5833"
        stroke="currentColor"
        strokeOpacity="1"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
