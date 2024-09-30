import React from "react";
import { IconProps } from "../../types/iconProps";

export default function EditIcon({ size = "20" }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 20 20'
    >
      <path
        fill='currentColor'
        d='M18.341 1.659a2.25 2.25 0 0 0-3.182 0l-.992.992 3.182 3.182.992-.992a2.25 2.25 0 0 0 0-3.182ZM16.44 6.742 13.258 3.56 2.843 13.975a4.5 4.5 0 0 0-1.13 1.897l-.686 2.302a.643.643 0 0 0 .8.8l2.3-.686a4.5 4.5 0 0 0 1.898-1.131L16.44 6.742Z'
      />
    </svg>
  );
}
