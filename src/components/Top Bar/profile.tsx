import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import Backdrop from "../Backdrop";
import { url } from "../../utils/general";
import { Link } from "react-router-dom";

const UserProfile: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <div className="profile-container" onClick={() => setOpen(!isOpen)}>
        <div
          className="inner"
          style={{
            backgroundImage: `url(${user?.profile})`,
          }}
        ></div>
      </div>
      <Backdrop state={[isOpen, setOpen]} borderRadius="2em">
        <div style={{ overflow: "auto", height: "100%", padding: "1.5em" }}>
          <h1>username = {user && user.username}</h1>
          <h2>email = {user && user.email}</h2>
          <h2>id = {user && user._id}</h2>
          <Link to="/login">Logout</Link>
        </div>
      </Backdrop>
    </>
  );
};

export default UserProfile;
