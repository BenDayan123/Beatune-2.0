import React, { useContext, PropsWithChildren, useReducer } from "react";
import { reducer, Action } from "./reducer";
import { AnimatePresence } from "framer-motion";
import Notification from "../../components/Notification";
export { ACTIONS } from "./reducer";

export interface INotification {
  id?: string | number;
  type: "successful" | "info" | "warning" | "error";
  title: string;
  description?: string;
}

type Context = React.Dispatch<Action>;

const NotificationContext = React.createContext<Context>({} as Context);

export function useNotification() {
  return useContext(NotificationContext);
}

export const NotificationProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const [notifications, dispatch] = useReducer(reducer, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <div id="notifications-container">
        <AnimatePresence>
          {notifications.map((notification, i) => {
            return <Notification {...notification} key={i} />;
          })}
        </AnimatePresence>
      </div>
      {children}
    </NotificationContext.Provider>
  );
};
