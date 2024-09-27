import React from "react";
import { IconProps } from "../../types/iconProps";
import { defaultIconProps } from "../../types/defaultIconProps";

export default function LikeIcon({
  size = defaultIconProps.size,
  active = defaultIconProps.active,
}: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill={active ? "currentColor" : "none"}
      viewBox='0 0 24 24'
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={size === "20" ? "1.8" : "1.5"}
        d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z'
      />
    </svg>
  );
}