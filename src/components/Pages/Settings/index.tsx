import React, { useMemo } from "react";
import NavBar, { RouteType } from "../../NavBar";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { GeneralPage } from "./routes";
import "./style.scss";
import { CloseButton } from "../../Close";

const routes: RouteType[] = [
  { path: "general", text: "General" },
  { path: "security", text: "Security" },
  { path: "audio", text: "Audio" },
];

const Settings: React.FC = () => {
  const location = useLocation();
  const path = useMemo(() => location.state.path, []);
  const nav = useNavigate();

  return (
    <div className="page settings">
      <h1 id="title">Settings</h1>
      <CloseButton onClick={() => nav(path)} />
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
