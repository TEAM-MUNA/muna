import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function ReviewIcon({
  size = defaultIconProps.size.sm,
}: IconProps) {
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
        d='M7.188 8.125a.312.312 0 1 1-.625 0 .312.312 0 0 1 .625 0Zm0 0h-.313m3.438 0a.312.312 0 1 1-.625 0 .312.312 0 0 1 .624 0Zm0 0H10m3.438 0a.312.312 0 1 1-.625 0 .312.312 0 0 1 .624 0Zm0 0h-.313m-11.25 2.508c0 1.334.936 2.495 2.256 2.69.905.133 1.82.235 2.744.307v3.87l3.486-3.486a.95.95 0 0 1 .649-.276 40.256 40.256 0 0 0 4.859-.415c1.32-.194 2.256-1.356 2.256-2.69V5.617c0-1.334-.936-2.495-2.256-2.69A40.326 40.326 0 0 0 10 2.5a40.28 40.28 0 0 0-5.869.428c-1.32.194-2.256 1.355-2.256 2.69v5.015Z'
      />
    </svg>
  );
}
