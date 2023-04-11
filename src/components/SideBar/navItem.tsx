import React from "react";
import { NavLink } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useCycle } from "framer-motion";
import classNames from "classnames";
import { generateUUID } from "../../utils/general";

export interface IGroup {
  label?: string;
  togglable?: boolean;
  items: Item[];
}

export const NavGroup: React.FC<IGroup> = ({
  label,
  items,
  togglable = false,
}) => {
  const [isClose, toggle] = useCycle(false, true);

  return (
    <div className="nav-group">
      {label && (
        <div className="title-container">
          <p className="groupTitle">{label}</p>
          {togglable && (
            <ExpandLessIcon
              className="expand-icon"
              onClick={() => toggle()}
              style={{
                transform: `rotate(${isClose ? "90" : "180"}deg)`,
              }}
            />
          )}
        </div>
      )}
      <div
        className="items-container"
        style={{ height: isClose ? "0" : "auto" }}
      >
        {items.map((item) => {
          return <NavItem {...item} key={generateUUID()} />;
        })}
      </div>
    </div>
  );
};

//---------------------------------------------------------------
export interface Item {
  title: string;
  path: string;
  icon?: any;
  [key: string]: any;
}
export const NavItem: React.FC<Item> = (props) => {
  const { title, path, icon: Icon, ...rest } = props;

  return (
    <NavLink
      {...rest}
      to={path}
      className={({ isActive }) => classNames("nav-item", { active: isActive })}
    >
      {<Icon className="icon" />}
      <p className="title">{title}</p>
    </NavLink>
  );
};

// rafce
