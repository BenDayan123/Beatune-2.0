import React, { PropsWithChildren } from "react";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";
import "./style.scss";

interface Props {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  title?: string;
}

export const SocialContainer: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  return (
    <div className="social-container">
      <div className="fieldset">
        <hr className="line" />
        <span className="text">Or</span>
        <hr className="line" />
      </div>
      <section className="grid">{children}</section>
    </div>
  );
};

export const SocialButton: React.FC<Props> = ({ icon: Icon, title }) => {
  return (
    <div className={"social-button " + title} title={title}>
      {<Icon className="icon" />}
    </div>
  );
};
