import React from "react";
import NavBar, { RouteType } from "../../NavBar";
import { Routes, Route, Navigate } from "react-router-dom";
import { GeneralPage } from "./routes";
import "./style.scss";

const routes: RouteType[] = [
  { path: "general", text: "General" },
  { path: "security", text: "Security" },
  { path: "notifications", text: "Notifications" },
  { path: "audio", text: "Audio" },
  { path: "other", text: "Other" },
];

const Settings: React.FC = () => {
  return (
    <div className="page settings">
      <h1 id="title">Settings</h1>
      <NavBar routes={routes} />
      <div id="options-section">
        <Routes>
          <Route path="general" index element={<GeneralPage />} />
          <Route path="security" element={<h1>security</h1>} />
          <Route path="notifications" element={<h1>notifications</h1>} />
          <Route path="audio" element={<h1>audio</h1>} />
          <Route path="other" element={<h1>other</h1>} />
          <Route path="*" element={<Navigate to="general" replace />} />
        </Routes>
      </div>
    </div>
  );
};

export default Settings;
