import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function ArrowLeftIcon({
  size = defaultIconProps.size.md,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.5 19.5L3 12M3 12L10.5 4.5M3 12L21 12'
        stroke='#1a1a1aeb'
        strokeOpacity='0.92'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
