import React, {
  useEffect,
  createContext,
  PropsWithChildren,
  useState,
  useMemo,
} from "react";
import useLocalStorage from "./useLocalStorage";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../utils/general";
import useAxios, { ResponseValues } from "axios-hooks";
import { IUser } from "../interfaces";

// TODO handle refetch new JWT token

type BodyType = {
  access_token: string;
};

interface AuthProps {
  form: { [key: string]: string | number | File } | FormData;
  path: string;
}

interface IAuthContext {
  logout(): void;
  user: IUser | undefined;
  auth({ form, path }: AuthProps): Promise<void>;
  authState: ResponseValues<BodyType, any, any>;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export function useAuth() {
  return React.useContext(AuthContext);
}

export const AuthProvider: React.FC<PropsWithChildren<any>> = ({
  children,
}) => {
  const navigate = useNavigate();
  const [accessToken, setAccessToken] = useLocalStorage<string | null>(
    "access_token"
  );
  const [user, setUser] = useState<IUser | undefined>({} as IUser);
  const [authState, authForToken] = useAxios<BodyType>(
    { method: "POST" },
    { manual: true }
  );

  const decodeToken = useMemo(() => {
    if (accessToken) {
      const base64Url = accessToken.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    }
    return null;
  }, [accessToken]);

  const auth = async ({ form, path }: AuthProps) => {
    const { data, status } = await authForToken({ url: path, data: form });
    status === 201 && setAccessToken(data.access_token);
    // const { status, data } = await axios.post<BodyType>(url + path, form);
  };

  const logout = () => {
    setUser(undefined);
    setAccessToken(null);
  };

  useEffect(() => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

    if (decodeToken) {
      axios
        .get<IUser>(url + "/user")
        .then(({ data }) => {
          setUser(data);
          navigate("/app");
        })
        .catch(() => logout());
    } else {
      logout();
    }
  }, [accessToken]);

  return (
    <AuthContext.Provider value={{ auth, logout, user, authState }}>
      {children}
    </AuthContext.Provider>
  );
};
