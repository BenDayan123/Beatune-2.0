import React from "react";
import "./style.scss";

const LogoLoading: React.FC = () => {
  return (
    <div className="logo-loading">
      <div id="blob"></div>
      <div id="blur"></div>
      <div className="logo">
        <div className="lines">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
      </div>
    </div>
  );
};

export default LogoLoading;
