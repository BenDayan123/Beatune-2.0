import React from "react";
import "./style.scss";
import CloseIcon from "@mui/icons-material/Close";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

export const CloseButton: React.FC<Props> = (props) => {
  return (
    <button {...props} className="close-button">
      <CloseIcon />
    </button>
  );
};
