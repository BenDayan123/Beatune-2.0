import React, { PropsWithChildren } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import classNames from "classnames";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  active?: boolean;
  menu?: string;
  hover?: boolean;
  isDisable?: boolean;
}

const IconContainer: React.FC<PropsWithChildren<Props>> = ({
  icon: Icon,
  active,
  menu,
  isDisable,
  ...props
}) => {
  const { className, onClick, ...rest } = props;
  return (
    <div
      className={classNames(
        "icon--container",
        { active, disabled: isDisable },
        className
      )}
      onClick={(e) => {
        if (isDisable) return e.preventDefault();
        onClick && onClick(e);
      }}
      {...rest}
    >
      {menu && <label className="hover-menu">{menu}</label>}
      <Icon className="icon" />
    </div>
  );
};

export default IconContainer;
