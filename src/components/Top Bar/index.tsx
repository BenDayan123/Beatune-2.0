import React, { useState } from "react";
import AutoCompleteInput from "../Inputs/AutoComplete";
import UserProfile from "./profile";
import { Settings, ArrowBack, ArrowForward } from "@mui/icons-material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import IconWrap from "../Icon";
import { useNavigate } from "react-router-dom";
import { useSaveLocal } from "../../utils/storage";
import "./style.scss";

const TopBar: React.FC = () => {
  const navigate = useNavigate();
  // const progress = useSaveLocal("62bb43392490d59b55225ba4");

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
            onClick={() => navigate("settings")}
            icon={Settings}
          />
          <UserProfile />
        </div>
      </header>
    </div>
  );
};

export default TopBar;
