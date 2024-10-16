import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function ImageLayersIcon({
  size = defaultIconProps.size.sm,
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M13.125 13.75L15 13.75C16.0355 13.75 16.875 12.9105 16.875 11.875L16.875 5C16.875 3.96447 16.0355 3.125 15 3.125L8.125 3.125C7.08947 3.125 6.25 3.96447 6.25 5L6.25 6.875M13.125 13.75L13.125 15C13.125 16.0355 12.2855 16.875 11.25 16.875L5 16.875C3.96447 16.875 3.125 16.0355 3.125 15L3.125 8.75C3.125 7.71447 3.96447 6.875 5 6.875L6.25 6.875M13.125 13.75L13.125 8.75C13.125 7.71447 12.2855 6.875 11.25 6.875L6.25 6.875'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
