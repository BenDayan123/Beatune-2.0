import React, { useEffect, useRef } from "react";
import { useMusicPlayer } from "../hooks/useMusicPlayer";
import { ACTIONS } from "../hooks/useMusicPlayer";
import { url } from "../utils/general";
import {
  useNotification,
  ACTIONS as NotificationActions,
} from "../hooks/useNotifications";

const AudioRef = () => {
  const [musicPlayer, dispatch] = useMusicPlayer();
  const notificationDispatch = useNotification();
  const { query, index, playback, volume, is_playing, is_mute } = musicPlayer;
  const audio = useRef<HTMLAudioElement>({} as HTMLAudioElement);

  const handleTimeUpdate = (
    e: React.SyntheticEvent<HTMLAudioElement, Event>
  ) => {
    const { currentTime, duration } = e.currentTarget;
    dispatch({
      type: ACTIONS.UPDATE,
      payload: {
        playback: {
          ...playback,
          currentTime,
          duration,
        },
      },
    });
  };

  const handleError = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const { error } = e.currentTarget;
    let message = "An unknown error occurred.";
    if (!error) return;
    switch (error.code) {
      case error.MEDIA_ERR_ABORTED:
        message = "You aborted the audio playback.";
        break;
      case error.MEDIA_ERR_NETWORK:
        message = "A network error caused the audio download to fail.";
        break;
      case error.MEDIA_ERR_DECODE:
        message =
          "The audio playback was aborted due to a corruption problem or because the audio used features your version didn't support.";
        break;
      case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
        message =
          "The audio not be loaded, either because the server or network failed or because the format is not supported.";
        break;
    }
    notificationDispatch({
      type: NotificationActions.ADD_NOTIFICATION,
      payload: {
        type: "error",
        title: "Error!",
        description: message,
      },
    });
  };

  useEffect(() => {
    function handleShortKeys(e: KeyboardEvent) {
      switch (e.keyCode) {
        case 37: {
          dispatch({
            type: ACTIONS.SET_CURRENT_TIME,
            payload: { currentTime: audio.current.currentTime - 5 },
          });
          break;
        }
        case 39: {
          dispatch({
            type: ACTIONS.SET_CURRENT_TIME,
            payload: { currentTime: audio.current.currentTime + 5 },
          });
          break;
        }
        case 32: {
          dispatch({ type: ACTIONS.TOGGLE_PLAY });
          break;
        }
        // case 77: {
        //   dispatch({ type: ACTIONS.TOGGLE_MUTE });
        //   break;
        // }
      }
    }
    document.addEventListener("keydown", handleShortKeys);
    return () => document.removeEventListener("keydown", handleShortKeys);
  }, []);

  useEffect(() => {
    audio.current.volume = volume / 100;
  }, [volume]);

  useEffect(() => {
    is_playing ? audio.current.play() : audio.current.pause();
  }, [is_playing]);

  useEffect(() => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: { audio },
    });
  }, [dispatch, audio]);

  return (
    <audio
      ref={audio}
      src={query[index]?._id && `${url}/song/${query[index]._id}/audio`}
      // src={query[index] && `${url}/media/songs/${query[index]._id}.mp3`}
      // preload="auto"
      autoPlay
      muted={is_mute}
      loop={musicPlayer.loop}
      onLoad={() =>
        dispatch({ type: ACTIONS.UPDATE, payload: { loading: true } })
      }
      onEnded={() => dispatch({ type: ACTIONS.FORWARD })}
      onCanPlay={() =>
        dispatch({ type: ACTIONS.UPDATE, payload: { can_play: true } })
      }
      onPlay={() =>
        dispatch({ type: ACTIONS.UPDATE, payload: { is_playing: true } })
      }
      onPause={() =>
        dispatch({ type: ACTIONS.UPDATE, payload: { is_playing: false } })
      }
      onError={handleError}
      onTimeUpdate={handleTimeUpdate}
      onLoadedData={handleTimeUpdate}
    />
  );
};

export default AudioRef;
