import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function StarIcon({
  size = "20",
  active = defaultIconProps.active,
}: IconProps) {
  const strokeWidth = (iconSize: string) => {
    switch (iconSize) {
      case "40":
        return "1";
      case "20":
      case "14":
        return "1.5";
      default:
        return "1.2";
    }
  };

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
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.8685 2.8687C10.5474 2.11668 9.45378 2.11668 9.13268 2.8687L7.30188 7.15641L2.54981 7.52751C1.71635 7.5926 1.3784 8.60577 2.0134 9.13562L5.63398 12.1567L4.52784 16.6737C4.33383 17.466 5.21861 18.0922 5.93216 17.6676L10.0006 15.247L14.069 17.6676C14.7826 18.0922 15.6674 17.466 15.4734 16.6737L14.3672 12.1567L17.9878 9.13562C18.6228 8.60577 18.2849 7.5926 17.4514 7.52751L12.6993 7.15641L10.8685 2.8687Z'
          fill='currentColor'
        />
      ) : (
        <path
          d='M9.56663 2.91569C9.72675 2.53071 10.2721 2.53071 10.4322 2.91569L12.2039 7.17524C12.2714 7.33753 12.424 7.44843 12.5992 7.46247L17.1978 7.83113C17.6134 7.86445 17.7819 8.38313 17.4653 8.65438L13.9617 11.6556C13.8282 11.7699 13.7699 11.9494 13.8106 12.1203L14.8811 16.6077C14.9778 17.0133 14.5366 17.3339 14.1808 17.1165L10.2438 14.7118C10.0938 14.6202 9.9051 14.6202 9.7551 14.7118L5.8181 17.1165C5.46228 17.3339 5.02106 17.0133 5.11781 16.6077L6.18822 12.1203C6.229 11.9494 6.1707 11.7699 6.03721 11.6556L2.53361 8.65438C2.21695 8.38313 2.38548 7.86446 2.80109 7.83114L7.39963 7.46247C7.57485 7.44843 7.72748 7.33753 7.79498 7.17524L9.56663 2.91569Z'
          stroke='currentColor'
          strokeWidth={strokeWidth(size)}
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      )}
    </svg>
  );
}
