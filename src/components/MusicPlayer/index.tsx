import React, { useEffect, useMemo, useState } from "react";
import RangeBar from "../Sliderbar";
import { useMusicPlayer, ACTIONS } from "../../hooks/useMusicPlayer";
import AudioRef from "../audio-player";
import Controls from "./controls";
import {
  Link,
  useNavigate,
  useMatch,
  useResolvedPath,
  useLocation,
} from "react-router-dom";
import { IsEmpty } from "../../utils/general";
import Queue from "../Pages/Query";
import { secondsToISOFormet } from "../../utils/format";
import VolumeController from "./volume";
import IconContainer from "../Icon";
import { Lyrics, QueueMusic } from "@mui/icons-material";
import { useTheme } from "../../hooks/useTheme";
import { ImageShimmer } from "../Loading/shimmer/image";
import { emit } from "@tauri-apps/api/event";
import "./style.scss";
import { ContextMenuWrapper } from "../ContextMenu";
import { TrackContextMenu } from "../Pages/Album/ContextMenu/track";
import { ISong } from "../../interfaces";
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
  const { audio, playback, currentTrack } = musicPlayer;

  const { theme } = useTheme();
  const isLyricsActive = useMatch({
    path: useResolvedPath("lyrics").pathname,
  });
  const [isQueueActive, setQueueActive] = useState(false);
  // const isQueueActive = useMatch({
  //   path: useResolvedPath("queue").pathname,
  // });

  const nav = useNavigate();

  useEffect(() => {
    if (!currentTrack) return;
    const { title, artist, album } = currentTrack;
    navigator.mediaSession.metadata = new MediaMetadata({
      title,
      artwork: [{ src: album.image }],
      artist: artist?.name,
    });

    emit("song-change", {
      name: `Listening to "${title}"`,
      artist: "By " + artist?.name,
      image: album?.small_image,
    });
  }, [currentTrack]);

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
      <ContextMenuWrapper
        items={<TrackContextMenu track={currentTrack as ISong} />}
        className="song-info"
        style={{ visibility: currentTrack ? "visible" : "hidden" }}
      >
        {currentTrack && (
          <>
            <ImageShimmer
              className="song-image"
              src={currentTrack.album.small_image}
              alt=""
            />
            <div className="song-data">
              <label className="song-name">{currentTrack.title}</label>
              <Link
                to={`/app/home?id=${currentTrack.artist?._id}`}
                className="artist-name"
              >
                {currentTrack.artist && currentTrack.artist.name}
              </Link>
            </div>
          </>
        )}
      </ContextMenuWrapper>
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
        <div style={{ position: "relative" }}>
          <IconContainer
            icon={QueueMusic}
            menu="Queue"
            active={Boolean(isQueueActive)}
            onClick={() => setQueueActive((p) => !p)}
          />
          {Boolean(isQueueActive) && (
            <div className="popup-menu">
              <Queue />
            </div>
          )}
        </div>
        <IconContainer
          menu="Lyrics"
          icon={Lyrics}
          isDisable={!currentTrack}
          active={Boolean(isLyricsActive)}
          onClick={() => {
            !Boolean(isLyricsActive) ? nav("lyrics") : nav(-1);
          }}
        />
        <VolumeController />
      </div>
    </div>
  );
};

export default MusicPlayer;
