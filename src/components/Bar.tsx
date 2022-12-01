import * as React from "react";

interface IBarProps {
  color: string;
  height: number;
}

const Bar: React.FunctionComponent<IBarProps> = ({ color, height }) => {
  return (
    <div
      style={{ height: `${height}px` }}
      className={`h-full  ${color} rounded-t-xl border border-slate-300`}
    ></div>
  );
};

export default Bar;
