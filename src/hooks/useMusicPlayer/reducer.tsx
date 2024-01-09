import { IMusicPlayer } from ".";
import { shuffle as shuffleQuery, unshuffle } from "../../utils/shuffle";

export type Action = {
  type: number;
  payload?: any;
};

export enum ACTIONS {
  UPDATE,
  FORWARD,
  BACKWARD,
  TOGGLE_PLAY,
  TOGGLE_MUTE,
  TOGGLE_LOOP,
  SET_CURRENT_TIME,
  TOGGLE_SHUFFLE_QUERY,
  ADD_NEXT,
  ADD_TO_END,
}

export function reducer(state: IMusicPlayer, action: Action): IMusicPlayer {
  const { payload } = action;
  switch (action.type) {
    case ACTIONS.UPDATE: {
      return { ...state, ...payload };
    }
    case ACTIONS.ADD_NEXT: {
      const { query, index } = state;
      const copy = [...query];
      copy.splice(index + 1, 0, payload.track);
      return { ...state, query: copy };
    }
    case ACTIONS.ADD_TO_END: {
      return { ...state, query: [...state.query, payload.track] };
    }
    case ACTIONS.FORWARD: {
      const { query, index } = state;
      return { ...state, index: query[index + 1] ? state.index + 1 : 0 };
    }
    case ACTIONS.BACKWARD: {
      const { index } = state;
      if (index !== 0) {
        return { ...state, index: state.index - 1 };
      }
      state.audio?.current && (state.audio.current.currentTime = 0);
      return { ...state };
    }
    case ACTIONS.TOGGLE_PLAY: {
      return { ...state, is_playing: !state.is_playing };
    }
    case ACTIONS.TOGGLE_LOOP: {
      return { ...state, loop: !state.loop };
    }
    case ACTIONS.SET_CURRENT_TIME: {
      const { currentTime } = payload;
      state.audio?.current && (state.audio.current.currentTime = currentTime);
      return state;
    }
    case ACTIONS.TOGGLE_MUTE: {
      const { is_mute } = state;
      return { ...state, is_mute: !is_mute };
    }
    case ACTIONS.TOGGLE_SHUFFLE_QUERY: {
      const { shuffle, query, seed, index } = state;
      if (!shuffle) {
        const { list, seed } = shuffleQuery(query, index);
        return {
          ...state,
          seed,
          shuffle: !shuffle,
          query: list,
        };
      }
      return {
        ...state,
        shuffle: !shuffle,
        query: unshuffle(query, seed),
      };
    }
    default:
      return state;
  }
}
