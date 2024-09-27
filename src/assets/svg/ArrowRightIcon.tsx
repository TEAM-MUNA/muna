import React from "react";
import defaultIconProps from "../../types/defaultIconProps";
import { IconProps } from "../../types/iconProps";

export default function ArrowRightIcon({
  size = defaultIconProps.size,
  stroke = defaultIconProps.stroke,
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
        stroke={stroke}
        strokeOpacity='0.92'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
