import classNames from "classnames";
import React, { PropsWithChildren } from "react";
import { NavLink } from "react-router-dom";

interface Props
  extends React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>,
    HTMLLIElement
  > {
  to: string;
}

export const FilterItem: React.FC<PropsWithChildren<Props>> = ({
  children,
  to,
  ...rest
}) => {
  return (
    <NavLink
      to={to}
      relative="path"
      className={({ isActive }) => classNames("item", { active: isActive })}
    >
      {children}
    </NavLink>
  );
};
// className={"item " + (isActive ? "active" : "")} {...rest}
