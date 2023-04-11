import React from "react";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import RippleButton from "../../RippleButton";

const Buttons: React.FC = () => {
  return (
    <div className="buttons-container">
      <RippleButton className="play">
        Play <PlayArrowIcon />
      </RippleButton>
      <button className="follow">Follow</button>
    </div>
  );
};

export default Buttons;
