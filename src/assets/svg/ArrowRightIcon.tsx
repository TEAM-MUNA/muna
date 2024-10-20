import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function ArrowRightIcon({
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
        d='M13.5 4.5L21 12M21 12L13.5 19.5M21 12H3'
        stroke='#1A1A1A'
        strokeOpacity='0.92'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
