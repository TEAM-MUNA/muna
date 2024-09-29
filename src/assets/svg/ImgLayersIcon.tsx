import React from "react";
import defaultIconProps from "../../types/defaultIconProps";
import { IconProps } from "../../types/iconProps";

export default function ImgLayersIcon({
    size = defaultIconProps.size,
}: IconProps) {
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='40'
        height='40'
        fill='none'
        viewBox='0 0 40 40'
      >
        <g filter='url(#a)'>
          <path
            stroke='#fff'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-opacity='.8'
            d='M25.107 23.12c.56 0 1.013-.454 1.013-1.013v-7.094c0-.56-.454-1.013-1.013-1.013h-7.094c-.56 0-1.013.454-1.013 1.013'
            shape-rendering='crispEdges'
          />
        </g>
        <g filter='url(#b)'>
          <path
            fill='#fff'
            fill-opacity='.8'
            d='M22.107 17h-7.094c-.56 0-1.013.454-1.013 1.013v7.094c0 .56.454 1.013 1.013 1.013h7.094c.56 0 1.013-.454 1.013-1.013v-7.094c0-.56-.454-1.013-1.013-1.013Z'
            shape-rendering='crispEdges'
          />
          <path
            stroke='#fff'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-opacity='.8'
            d='M22.107 17h-7.094c-.56 0-1.013.454-1.013 1.013v7.094c0 .56.454 1.013 1.013 1.013h7.094c.56 0 1.013-.454 1.013-1.013v-7.094c0-.56-.454-1.013-1.013-1.013Z'
            shape-rendering='crispEdges'
          />
        </g>
        <defs>
          <filter
            id='a'
            width='14.12'
            height='14.12'
            x='14.5'
            y='11.5'
            color-interpolation-filters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='1' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
            <feBlend
              in2='BackgroundImageFix'
              result='effect1_dropShadow_112709_2998'
            />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow_112709_2998'
              result='shape'
            />
          </filter>
          <filter
            id='b'
            width='14.12'
            height='14.12'
            x='11.5'
            y='14.5'
            color-interpolation-filters='sRGB'
            filterUnits='userSpaceOnUse'
          >
            <feFlood flood-opacity='0' result='BackgroundImageFix' />
            <feColorMatrix
              in='SourceAlpha'
              result='hardAlpha'
              values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            />
            <feOffset />
            <feGaussianBlur stdDeviation='1' />
            <feComposite in2='hardAlpha' operator='out' />
            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0' />
            <feBlend
              in2='BackgroundImageFix'
              result='effect1_dropShadow_112709_2998'
            />
            <feBlend
              in='SourceGraphic'
              in2='effect1_dropShadow_112709_2998'
              result='shape'
            />
          </filter>
        </defs>
      </svg>
    );
}
