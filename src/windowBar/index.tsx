import React from "react";
import {
  CloseRounded,
  // RemoveRounded,
  // CheckBoxOutlineBlankRounded,
} from "@mui/icons-material";
import { appWindow } from "@tauri-apps/api/window";
import { useTheme } from "../hooks/useTheme";
import "./index.scss";

const themes = {
  light: {
    bg: "#f1f1f1",
  },
  dark: {
    bg: "#161616",
  },
};

const WindowBar: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div
      data-tauri-drag-region
      className="window-bar"
      style={{ background: themes[theme]?.bg }}
    >
      <h5
        id="href"
        style={{ color: themes[theme === "dark" ? "light" : "dark"].bg }}
      >
        Beatune 2.0
      </h5>
      <div
        className="button minimize"
        onClick={() => appWindow.minimize()}
      ></div>
      <div
        className="button toggleMaximize"
        onClick={() => appWindow.toggleMaximize()}
      ></div>
      <div className="button close" onClick={() => appWindow.close()}>
        <CloseRounded />
      </div>
    </div>
  );
};

export default WindowBar;
