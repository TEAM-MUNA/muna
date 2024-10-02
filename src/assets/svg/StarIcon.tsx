import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function StarIcon({
  size = "20",
  active = defaultIconProps.active,
}: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={size}
      height={size}
      fill='none'
      viewBox='0 0 20 20'
    >
      {active ? (
        <path
          fill='currentColor'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.8685 2.8837C10.5474 2.11168 9.45378 2.11168 9.13268 2.8837L7.30188 7.28547L2.54981 7.66644C1.71635 7.73326 1.3784 8.77337 2.0134 9.31732L5.63398 12.4187L4.52784 17.056C4.33383 17.8693 5.21861 18.5121 5.93216 18.0763L10.0006 15.5913L14.069 18.0763C14.7826 18.5121 15.6674 17.8693 15.4734 17.056L14.3672 12.4187L17.9878 9.31732C18.6228 8.77337 18.2849 7.73326 17.4514 7.66644L12.6993 7.28547L10.8685 2.8837Z'
        />
      ) : (
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M9.5676 2.91569C9.72773 2.53071 10.2731 2.53071 10.4332 2.91569L12.2049 7.17524C12.2724 7.33753 12.425 7.44843 12.6002 7.46247L17.1987 7.83113C17.6144 7.86445 17.7829 8.38313 17.4662 8.65438L13.9626 11.6556C13.8291 11.7699 13.7708 11.9494 13.8116 12.1203L14.882 16.6077C14.9788 17.0133 14.5376 17.3339 14.1817 17.1165L10.2447 14.7118C10.0947 14.6202 9.90608 14.6202 9.75607 14.7118L5.81908 17.1165C5.46325 17.3339 5.02204 17.0133 5.11879 16.6077L6.18919 12.1203C6.22998 11.9494 6.17168 11.7699 6.03818 11.6556L2.53458 8.65438C2.21792 8.38313 2.38645 7.86446 2.80207 7.83114L7.40061 7.46247C7.57582 7.44843 7.72845 7.33753 7.79596 7.17524L9.5676 2.91569Z'
        />
      )}
    </svg>
  );
}
