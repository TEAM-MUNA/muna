export interface IconProps extends React.SVGProps<SVGSVGElement> {
  width?: number;
  stroke?: string;
}

// 기본값
IconProps.defaultProps = {
  width: 24,
  stroke: "black",
};
