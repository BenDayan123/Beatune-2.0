import React from "react";
import { PlayArrow } from "@mui/icons-material";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import SoundWave from "../SoundWave";

interface Props {
  index: number | null;
  isActive?: boolean;
}

const IndexCell: React.FC<Props> = ({ index, isActive }) => {
  const [musicPlayer] = useMusicPlayer();

  return index ? (
    <div className="cell index">
      {isActive ? (
        !musicPlayer.is_playing ? (
          <PlayArrow />
        ) : (
          <SoundWave waves={4} />
        )
      ) : (
        <p className="number">{index}</p>
      )}
    </div>
  ) : null;
};

export default IndexCell;
