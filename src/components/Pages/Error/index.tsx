import React from "react";
import "./style.scss";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { SvgIconTypeMap } from "@mui/material";

interface Props {
  title: string;
  body: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
}

const ErrorPage: React.FC<Props> = ({ body, title, icon: Icon }) => {
  return (
    <div className="error-page">
      {Icon && (
        <div className="icon-container">
          <Icon className="icon" />
        </div>
      )}
      <h1 id="title">{title}</h1>
      <p className="text">{body}</p>
    </div>
  );
};

export default ErrorPage;
