import React from "react";
import { IconProps } from "../../types/iconProps";

export default function ImageLayersIcon({ size = "20" }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 20 20'
    >
      <path
        stroke='currentColor'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='1.5'
        d='M13.75 6.875V5c0-1.036-.84-1.875-1.875-1.875H5c-1.036 0-1.875.84-1.875 1.875v6.875c0 1.036.84 1.875 1.875 1.875h1.875m6.875-6.875H15c1.035 0 1.875.84 1.875 1.875V15c0 1.035-.84 1.875-1.875 1.875H8.75A1.875 1.875 0 0 1 6.875 15v-1.25m6.875-6.875h-5c-1.036 0-1.875.84-1.875 1.875v5'
      />
    </svg>
  );
}
