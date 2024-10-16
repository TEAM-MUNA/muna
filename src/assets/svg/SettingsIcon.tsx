import React from "react";
import { IconProps, defaultIconProps } from "../../types/iconProps";

export default function SettingsIcon({
  size = defaultIconProps.size.md,
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
        d='M9.59328 3.94005C9.68369 3.39759 10.153 3 10.703 3H13.2969C13.8469 3 14.3162 3.39759 14.4066 3.94005L14.6201 5.2211C14.6825 5.59514 14.9325 5.90671 15.2642 6.09036C15.3384 6.13142 15.4117 6.17383 15.4841 6.21757C15.8092 6.41384 16.2045 6.47486 16.5601 6.34166L17.7769 5.88578C18.2919 5.69284 18.8709 5.90051 19.1459 6.37677L20.4429 8.62321C20.7179 9.09948 20.6082 9.70473 20.1836 10.0543L19.1793 10.8811C18.8868 11.1219 18.7418 11.4937 18.7488 11.8725C18.7496 11.9149 18.75 11.9574 18.75 12C18.75 12.0426 18.7496 12.0851 18.7488 12.1275C18.7418 12.5063 18.8868 12.8781 19.1793 13.1189L20.1836 13.9457C20.6082 14.2953 20.7179 14.9005 20.4429 15.3768L19.1459 17.6232C18.8709 18.0995 18.2919 18.3071 17.7769 18.1142L16.5601 17.6583C16.2045 17.5251 15.8092 17.5862 15.4842 17.7824C15.4117 17.8262 15.3384 17.8686 15.2642 17.9096C14.9325 18.0933 14.6825 18.4049 14.6201 18.7789L14.4066 20.0599C14.3162 20.6024 13.8469 21 13.2969 21H10.703C10.153 21 9.68369 20.6024 9.59328 20.0599L9.37978 18.7789C9.31743 18.4049 9.06746 18.0933 8.73569 17.9096C8.66152 17.8686 8.5882 17.8262 8.51577 17.7824C8.19073 17.5862 7.7954 17.5251 7.43984 17.6583L6.22297 18.1142C5.70798 18.3072 5.12899 18.0995 4.85402 17.6232L3.55703 15.3768C3.28206 14.9005 3.39172 14.2953 3.8163 13.9457L4.82065 13.1189C5.11316 12.8781 5.25815 12.5063 5.25114 12.1275C5.25035 12.0851 5.24996 12.0426 5.24996 12C5.24996 11.9574 5.25035 11.9149 5.25114 11.8725C5.25815 11.4937 5.11315 11.1219 4.82065 10.8811L3.8163 10.0543C3.39171 9.70475 3.28206 9.09949 3.55703 8.62323L4.85402 6.37679C5.12899 5.90052 5.70798 5.69286 6.22297 5.88579L7.43982 6.34167C7.79539 6.47487 8.19072 6.41385 8.51575 6.21758C8.58819 6.17384 8.66151 6.13142 8.73569 6.09036C9.06746 5.90671 9.31743 5.59514 9.37977 5.2211L9.59328 3.94005Z'
        stroke='currentColor'
        strokeOpacity='0.6'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M14.9997 11.9999C14.9997 13.6568 13.6566 14.9999 11.9997 14.9999C10.3429 14.9999 8.99973 13.6568 8.99973 11.9999C8.99973 10.3431 10.3429 8.99992 11.9997 8.99992C13.6566 8.99992 14.9997 10.3431 14.9997 11.9999Z'
        stroke='currentColor'
        strokeOpacity='0.6'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
}
