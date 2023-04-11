import React, { useRef } from "react";
import "./style.scss";

//TODO fix props mangement

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  data_right?: string;
  data_left?: string;
  menu?: string;
}

const RangeBar: React.FC<Props> = ({
  data_left,
  data_right,
  menu,
  ...input
}) => {
  const { value, ...rest } = input;
  const inputRef = useRef<any>();

  return (
    <div className="range-container">
      <input //input ~ .thumb-menu
        type="range"
        className="range-bar"
        data-left={data_left}
        data-right={data_right}
        {...rest}
        ref={inputRef}
        value={value}
        alt=""
      />
      {menu && (
        <div
          className="thumb-menu"
          style={{ left: `calc(${value}% + (${15 - Number(value) * 0.15}px))` }}
        >
          {menu}
        </div>
      )}
    </div>
  );
};

export default RangeBar;
