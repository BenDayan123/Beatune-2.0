import React, { createContext, useReducer, PropsWithChildren } from "react";
import { reducer as PlayerReducer, Action, ACTIONS } from "./reducer";
import { ISong } from "../../interfaces";
import { useQuery } from "react-query";
import axios from "axios";

export interface IMusicPlayer {
  query: ISong[];
  index: number;
  seed: number[];
  currentTrack?: ISong;
  shuffle: boolean;
  is_playing: boolean;
  audio: React.RefObject<HTMLAudioElement>;
  volume: number;
  loop: boolean;
  loading: boolean;
  is_waiting: boolean;
  is_mute: boolean;
  can_play: boolean;
  playback: {
    duration: number;
    currentTime: number;
  };
}

type Prop = [IMusicPlayer, React.Dispatch<Action>];
export const MusicPlayerContext = createContext<Prop>({} as Prop);

export function useMusicPlayer() {
  return React.useContext(MusicPlayerContext);
}

export const MusicPlayerProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [musicPlayer, dispatch] = useReducer(PlayerReducer, {
    query: [],
    seed: [],
    index: -1,
    volume: 20,
    audio: {} as React.RefObject<HTMLAudioElement>,
    is_playing: false,
    loading: false,
    shuffle: false,
    is_mute: false,
    is_waiting: false,
    loop: false,
    can_play: false,
    playback: {
      duration: 0,
      currentTime: 0,
    },
  });
  const playedTrackID = musicPlayer.query[musicPlayer.index]?._id || null;

  const { data: currentTrack } = useQuery({
    queryKey: ["track", playedTrackID],
    queryFn: () =>
      axios.get<ISong>(`/song/${playedTrackID}`).then((res) => res.data),
    enabled: !!playedTrackID,
  });

  return (
    <MusicPlayerContext.Provider
      value={[{ ...musicPlayer, currentTrack }, dispatch]}
    >
      {children}
    </MusicPlayerContext.Provider>
  );
};

export { ACTIONS };
