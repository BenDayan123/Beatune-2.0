import React, { useEffect, useMemo } from "react";
import RangeBar from "../Sliderbar";
import { useMusicPlayer, ACTIONS } from "../../hooks/useMusicPlayer";
import AudioRef from "../audio-player";
import Controls from "./controls";
import { Link, useNavigate, useMatch, useResolvedPath } from "react-router-dom";
import { IsEmpty } from "../../utils/general";
import { secondsToISOFormet } from "../../utils/format";
import VolumeController from "./volume";
import IconContainer from "../Icon";
import { Lyrics, QueueMusic } from "@mui/icons-material";
import { useTheme } from "../../hooks/useTheme";
import { ImageShimmer } from "../Loading/shimmer/image";
import { emit } from "@tauri-apps/api/event";
import "./style.scss";
// import { Helmet } from "react-helmet";

const rangeColors = {
  light: {
    loaded: "#000000",
    buffered: "#c2bbbb",
    rest: "#f4f4f4",
  },
  dark: {
    loaded: "#fff",
    buffered: "#8a8787",
    rest: "#5e5e5e",
  },
};

const MusicPlayer: React.FC = () => {
  const [musicPlayer, dispatch] = useMusicPlayer();
  const currSong = musicPlayer.currSong();
  const { audio, playback } = musicPlayer;

  const { theme } = useTheme();
  const isLyricsActive = useMatch({
    path: useResolvedPath("lyrics").pathname,
  });
  const isQueueActive = useMatch({
    path: useResolvedPath("queue").pathname,
  });

  const nav = useNavigate();

  useEffect(() => {
    const { title, artist_id, small_image } = currSong;
    emit("song-change", {
      name: `Listening to "${title}"`,
      artist: "By " + artist_id?.name,
      image: small_image,
    });
  }, [currSong]);

  const { loaded, buffered, rest } = rangeColors[theme];
  const { percent, percentBuffered } = useMemo(() => {
    if (audio.current) {
      const { buffered } = audio.current;
      const percent = 100 * (playback.currentTime / playback.duration);
      const bufferedSec = buffered.length === 0 ? 0 : buffered.end(0);
      const percentBuffered = 100 * (bufferedSec / playback.duration);
      return { percent, percentBuffered };
    }
    return { percent: 0, percentBuffered: 0 };
  }, [audio, playback]);

  return (
    <div className="music-player">
      <AudioRef />
      <div
        className="song-info"
        style={{ visibility: currSong ? "visible" : "hidden" }}
      >
        {!IsEmpty(currSong) && (
          <>
            <ImageShimmer
              className="song-image"
              src={currSong.small_image}
              alt=""
            />
            <div className="song-data">
              <label className="song-name">{currSong.title}</label>
              <Link
                to={`/app/home?id=${currSong.artist_id?._id}`}
                className="artist-name"
              >
                {currSong.artist_id && currSong.artist_id.name}
              </Link>
            </div>
          </>
        )}
      </div>
      <div className="middle-controll">
        <Controls />
        <RangeBar
          data_left={secondsToISOFormet(playback.currentTime)}
          menu={secondsToISOFormet(playback.currentTime)}
          data_right={
            "-" + secondsToISOFormet(playback.duration - playback.currentTime)
          }
          value={percent || 0}
          style={{
            background: `linear-gradient(to right,
                            ${loaded} ${percent}%,
                            ${buffered} 0 ${percentBuffered}%,
                            ${rest} 0 ${percentBuffered}%)`,
          }}
          onInput={(e) => {
            const seekTo = playback.duration * (+e.currentTarget.value / 100);
            dispatch({
              type: ACTIONS.SET_CURRENT_TIME,
              payload: {
                currentTime: isFinite(seekTo) ? seekTo : 0,
              },
            });
          }}
          onMouseUp={() =>
            dispatch({ type: ACTIONS.UPDATE, payload: { is_playing: true } })
          }
          onMouseDown={() => {
            dispatch({ type: ACTIONS.UPDATE, payload: { is_playing: false } });
          }}
        />
      </div>
      <div className="right-control">
        <IconContainer
          icon={QueueMusic}
          menu="Queue"
          active={Boolean(isQueueActive)}
          onClick={() => nav("queue")}
        />
        <IconContainer
          menu="Lyrics"
          icon={Lyrics}
          isDisable={IsEmpty(currSong)}
          active={Boolean(isLyricsActive)}
          onClick={() => {
            nav(!Boolean(isLyricsActive) ? "lyrics" : "");
          }}
        />
        <VolumeController />
      </div>
    </div>
  );
};

export default MusicPlayer;
