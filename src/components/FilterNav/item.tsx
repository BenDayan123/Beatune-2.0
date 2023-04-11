import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface Props
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  isActive: boolean;
  to: string;
}

export const FilterItem: React.FC<PropsWithChildren<Props>> = ({
  isActive,
  children,
  ...rest
}) => {
  return (
    <li className={"item " + (isActive ? "active" : "")} {...rest}>
      {children}
    </li>
  );
};
