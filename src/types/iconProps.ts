import React from "react";

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: string; // md: "24" | sm: "20" | xs: "16" | 2xs: "14"
  active?: boolean;
}

export const defaultIconProps = {
  size: { md: "24", sm: "20", xs: "16", "2xs": "14" },
  active: false,
};
