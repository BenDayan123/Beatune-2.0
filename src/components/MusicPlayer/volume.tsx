import React, { useMemo } from "react";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import { ACTIONS } from "../../hooks/useMusicPlayer";
import {
  VolumeOffRounded,
  VolumeDownRounded,
  VolumeUpRounded,
} from "@mui/icons-material";
import RangeBar from "../Sliderbar";
import { useTheme } from "../../hooks/useTheme";
import IconContainer from "../Icon";

const volumesStates = [VolumeDownRounded, VolumeUpRounded];

const rangeColors = {
  light: {
    leftSide: "#000000",
    rest: "#f4f4f4",
  },
  dark: {
    leftSide: "#fff",
    rest: "#5e5e5e",
  },
};

const VolumeController: React.FC = () => {
  const [musicPlayer, dispatch] = useMusicPlayer();
  const { volume, is_mute } = musicPlayer;
  const { theme } = useTheme();
  const { leftSide, rest } = rangeColors[theme];

  const { Icon, volumeLevel } = useMemo(() => {
    const volumeLevel = is_mute ? 0 : volume;
    if (volume === 0 || is_mute) return { Icon: VolumeOffRounded, volumeLevel };
    const index = Math.round((volume / 100) * (volumesStates.length - 1));
    return { Icon: volumesStates[index], volumeLevel };
  }, [volume, is_mute]);

  return (
    <div className="volume-slider">
      <IconContainer
        menu={is_mute ? "Unmute" : "Mute"}
        icon={Icon}
        onClick={() =>
          dispatch({
            type: ACTIONS.TOGGLE_MUTE,
          })
        }
      />
      <RangeBar
        value={volumeLevel}
        menu={volumeLevel + "%"}
        style={{
          background: `linear-gradient(to right,${leftSide} ${volumeLevel}%,${rest} 0%)`,
        }}
        onInput={(e) =>
          dispatch({
            type: ACTIONS.UPDATE,
            payload: { volume: +e.currentTarget.value, is_mute: false },
          })
        }
      />
    </div>
  );
};

export default VolumeController;
