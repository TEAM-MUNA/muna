import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function BookmarkIcon({
  size = defaultIconProps.size.md,
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
        strokeWidth={size === "24" ? "1.5" : "1.8"}
        d='M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z'
      />
    </svg>
  );
}
