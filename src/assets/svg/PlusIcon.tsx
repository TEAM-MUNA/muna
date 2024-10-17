import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function PlusIcon({
  size = defaultIconProps.size.md,
}: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 24 24'
    >
      <path
        fill='currentColor'
        fillRule='evenodd'
        d='M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z'
        clipRule='evenodd'
      />
    </svg>
  );
}