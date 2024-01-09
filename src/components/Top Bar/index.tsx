import React, { useState } from "react";
import AutoCompleteInput from "../Inputs/AutoComplete";
import UserProfile from "./profile";
import { Settings, ArrowBack, ArrowForward } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconWrap from "../Icon";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="bar-container">
      <header className="top-bar">
        <div className="left-side">
          {window.__TAURI_METADATA__ && (
            <>
              <IconWrap icon={ArrowBack} onClick={() => navigate(-1)} />
              <IconWrap icon={ArrowForward} onClick={() => navigate(1)} />
            </>
          )}
          <AutoCompleteInput />
        </div>
        <div className="right-side">
          {!window.__TAURI_METADATA__ && (
            <button className="download-btn">
              <FileDownloadIcon /> Install App
            </button>
          )}
          <IconWrap
            className="icon icon-button"
            onClick={() =>
              navigate("settings", { state: { path: location.pathname } })
            }
            icon={Settings}
          />
          <UserProfile />
        </div>
      </header>
    </div>
  );
};

export default TopBar;
