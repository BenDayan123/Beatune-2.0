import { INotification } from ".";

export type Action = {
  type: number;
  payload?: any;
};

export enum ACTIONS {
  ADD_NOTIFICATION,
  REMOVE_NOTIFICATION,
}

export function reducer(
  state: INotification[],
  action: Action
): INotification[] {
  const { type, payload } = action;

  switch (type) {
    case ACTIONS.ADD_NOTIFICATION:
      return [...state, { ...payload, id: new Date().getUTCMilliseconds() }];
    case ACTIONS.REMOVE_NOTIFICATION:
      return state.filter((notification) => notification.id !== payload.id);
    default:
      return state;
  }
}
