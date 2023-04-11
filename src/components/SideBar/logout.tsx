import React from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const Logout: React.FC = () => {
  const nav = useNavigate();
  return (
    <div className="logout-container" onClick={() => nav("/login")}>
      <LogoutIcon className="icon" />
      <p id="title">Log Out</p>
    </div>
  );
};

export default Logout;
