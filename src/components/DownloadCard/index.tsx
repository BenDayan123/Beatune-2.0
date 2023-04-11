import React from "react";
import { ProgressCircle } from "../Progress/circle";
import "./style.scss";

interface Props {
  name: string;
  progress: number;
}

const DownloadCard: React.FC<Props> = ({ name, progress }) => {
  return (
    <div className="download-card">
      <div className="text-container">
        <h1>{100 <= progress ? "Done!" : "Downloading.."}</h1>
        <p className="name">{name}</p>
      </div>
      <ProgressCircle progress={progress} />
    </div>
  );
};

export default DownloadCard;
