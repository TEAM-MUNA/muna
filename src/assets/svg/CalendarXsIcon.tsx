import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function CalendarXsIcon({
  size = defaultIconProps.size.xs,
}: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 16 16'
    >
      <path
        fill='currentColor'
        // fillOpacity='.6'
        d='M5.75 7.5a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm5.25-2.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-3 .75a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0ZM8 9.5A.75.75 0 1 0 8 11a.75.75 0 0 0 0-1.5Z'
      />
      <path
        fill='currentColor'
        // fillOpacity='.6'
        fillRule='evenodd'
        d='M4.75 1a.75.75 0 0 0-.75.75V3a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2V1.75a.75.75 0 0 0-1.5 0V3h-5V1.75A.75.75 0 0 0 4.75 1ZM3.5 7a1 1 0 0 1 1-1h7a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V7Z'
        clipRule='evenodd'
      />
    </svg>
  );
}
