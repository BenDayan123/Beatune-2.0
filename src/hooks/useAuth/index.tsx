import React, {
  useEffect,
  createContext,
  PropsWithChildren,
  useState,
} from "react";
import { useLocalStorage } from "usehooks-ts";
import { GetUserRoute } from "../../api/auth";
import axios from "axios";
import { IUser } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface IAuthContext {
  user: IUser | null;
  dispatch: React.Dispatch<React.SetStateAction<string | null>>;
  LogOut(): void;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const nav = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "access_token",
    null
  );
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
    accessToken &&
      GetUserRoute().then((user) => {
        setUser(user);
        nav("/app");
      });
    // .catch(() => LogOut());
  }, [accessToken]);

  function LogOut() {
    setUser(null);
    setAccessToken(null);
  }

  return (
    <AuthContext.Provider value={{ user, dispatch: setAccessToken, LogOut }}>
      {children}
    </AuthContext.Provider>
  );
};
