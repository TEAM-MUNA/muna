import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string;
  active?: boolean;
}

export const defaultIconProps = {
  size: "24",
  active: false,
};
