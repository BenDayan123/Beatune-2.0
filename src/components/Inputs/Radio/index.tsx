import React from "react";
import classNames from "classnames";
import { useRadioState, RadioContainer } from "./state";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  description?: string;
}

export const RadioInput: React.FC<Props> = ({ description, ...rest }) => {
  const { setChecked, name } = useRadioState();
  const { value, className } = rest;
  return (
    <div className={classNames("input-radio", className)}>
      <input
        {...rest}
        type="radio"
        value={value}
        name={name}
        onChange={() => setChecked(value + "")}
      />
      <span className="checkmark"></span>
      <div>
        <label className="value">{value}</label>
        {description && <p className="description">{description}</p>}
      </div>
    </div>
  );
};

export { useRadioState, RadioContainer };
