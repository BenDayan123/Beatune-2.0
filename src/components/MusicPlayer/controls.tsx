import React, { useMemo } from "react";
import {
  PlayCircleFilledRounded,
  PauseCircleFilledRounded,
  SkipPreviousRounded,
  SkipNextRounded,
  LoopRounded,
  ShuffleRounded,
} from "@mui/icons-material";
import IconContainer from "../Icon";
import { useMusicPlayer, ACTIONS } from "../../hooks/useMusicPlayer";

const Controls: React.FC = () => {
  const [musicPlayer, dispatch] = useMusicPlayer();
  const { is_playing, shuffle, loop } = musicPlayer;

  const PlayIcon = useMemo(() => {
    return !is_playing ? PlayCircleFilledRounded : PauseCircleFilledRounded;
  }, [is_playing]);

  return (
    <div className="controls">
      <IconContainer
        menu="Shuffle"
        className="shuffle"
        icon={ShuffleRounded}
        active={shuffle}
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_SHUFFLE_QUERY })}
      />
      <IconContainer
        menu="Backward"
        className={"backward"}
        icon={SkipPreviousRounded}
        onClick={() => dispatch({ type: ACTIONS.BACKWARD })}
      />
      <IconContainer
        menu={is_playing ? "Pause" : "Play"}
        className="play"
        icon={PlayIcon}
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_PLAY })}
      />
      <IconContainer
        menu="Forward"
        className={"forward"}
        icon={SkipNextRounded}
        onClick={() => dispatch({ type: ACTIONS.FORWARD })}
      />
      <IconContainer
        menu="Repeat"
        active={loop}
        className="repeat"
        icon={LoopRounded}
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_LOOP })}
      />
    </div>
  );
};

export default Controls;

// !can_play ? (
//   <PulseLoading
//     style={{ width: "40px", height: "40px", padding: "10px" }}
//   />
