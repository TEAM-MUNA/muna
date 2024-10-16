import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function ArrowUpIcon({
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
        fillRule='evenodd'
        clipRule='evenodd'
        d='M14.7803 11.7803C14.4874 12.0732 14.0126 12.0732 13.7197 11.7803L10 8.06066L6.28033 11.7803C5.98744 12.0732 5.51256 12.0732 5.21967 11.7803C4.92678 11.4874 4.92678 11.0126 5.21967 10.7197L9.46967 6.46967C9.61032 6.32902 9.80109 6.25 10 6.25C10.1989 6.25 10.3897 6.32902 10.5303 6.46967L14.7803 10.7197C15.0732 11.0126 15.0732 11.4874 14.7803 11.7803Z'
        fill='#1a1a1aeb'
        fillOpacity='0.92'
      />
    </svg>
  );
}
