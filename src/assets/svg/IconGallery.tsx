import React from "react";
import defaultIconProps from "../../types/defaultIconProps";
import { IconProps } from "../../types/iconProps";

export default function IconGallery({
  size = defaultIconProps.size,
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
        d='M3.75 4.875C3.75 4.25368 4.25368 3.75 4.875 3.75H9.375C9.99632 3.75 10.5 4.25368 10.5 4.875V9.375C10.5 9.99632 9.99632 10.5 9.375 10.5H4.875C4.25368 10.5 3.75 9.99632 3.75 9.375V4.875Z'
        stroke='currentColor'
        strokeOpacity='0.92'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.75 14.625C3.75 14.0037 4.25368 13.5 4.875 13.5H9.375C9.99632 13.5 10.5 14.0037 10.5 14.625V19.125C10.5 19.7463 9.99632 20.25 9.375 20.25H4.875C4.25368 20.25 3.75 19.7463 3.75 19.125V14.625Z'
        stroke='currentColor'
        strokeOpacity='0.92'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 4.875C13.5 4.25368 14.0037 3.75 14.625 3.75H19.125C19.7463 3.75 20.25 4.25368 20.25 4.875V9.375C20.25 9.99632 19.7463 10.5 19.125 10.5H14.625C14.0037 10.5 13.5 9.99632 13.5 9.375V4.875Z'
        stroke='currentColor'
        strokeOpacity='0.92'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M13.5 14.625C13.5 14.0037 14.0037 13.5 14.625 13.5H19.125C19.7463 13.5 20.25 14.0037 20.25 14.625V19.125C20.25 19.7463 19.7463 20.25 19.125 20.25H14.625C14.0037 20.25 13.5 19.7463 13.5 19.125V14.625Z'
        stroke='currentColor'
        strokeOpacity='0.92'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
