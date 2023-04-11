import React, { createContext, useReducer, PropsWithChildren } from "react";
import { reducer as PlayerReducer, Action, ACTIONS } from "./reducer";
import { ISong } from "../../interfaces";

export interface IMusicPlayer {
  query: ISong[];
  index: number;
  currSong(): ISong;
  seed: number[];
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
    currSong: function (): ISong {
      return this.query[this.index] || {};
    },
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

  return (
    <MusicPlayerContext.Provider value={[musicPlayer, dispatch]}>
      {children}
    </MusicPlayerContext.Provider>
  );
};

export { ACTIONS };
