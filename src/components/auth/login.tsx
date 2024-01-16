import React, { useState, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import { Input } from "../Inputs/Input";
import { Link } from "react-router-dom";
import PulseLoading from "../Loading/pulse";
import { useAuth } from "../../hooks/useAuth";
import MessageError from "./message";
import RippleButton from "../RippleButton";
import Logo from "../../assests/icon.svg";
import { AccountCircle, Https } from "@mui/icons-material";
import { useMutation } from "react-query";
import { LoginRoute, ILoginForm } from "../../api/auth";
import "./style.scss";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isDisable, setDisable] = useState(true);
  const { dispatch, LogOut } = useAuth();

  const {
    mutate: loginUser,
    isLoading,
    error,
    isError,
  } = useMutation((userData: ILoginForm) => LoginRoute(userData), {
    onSuccess: ({ access_token }) => {
      dispatch(access_token);
    },
  });

  useEffect(() => LogOut(), []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !isDisable && loginUser({ username, password });
  };

  return (
    <Suspense>
      <div className="page-container-auth">
        <div className="info">
          <div className="logo-container">
            <img className="logo" src={Logo} alt="" />
            <h1 className="logo-name">Beatune 2.0</h1>
          </div>
          <h1 id="title">Welcome Back</h1>
        </div>
        <div className="form-container">
          <motion.div
            initial={{ x: window.innerWidth, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              damping: 30,
              duration: 0.5,
              stiffness: 400,
            }}
            className="content"
            exit={{ x: window.innerWidth, opacity: 0 }}
          >
            <form onSubmit={handleSubmit} autoComplete="off">
              <h1>Login Page</h1>
              <Input
                labelText="Username"
                icon={AccountCircle}
                state={[username, setUsername]}
                setDisable={setDisable}
                type="text"
                name="username"
                validations={(name) => [
                  {
                    check: name.length > 0,
                    msg: `Require!`,
                  },
                ]}
              />
              <Input
                state={[password, setPassword]}
                labelText="Passsword"
                icon={Https}
                type="password"
                setDisable={setDisable}
                validations={(password) => [
                  {
                    check: password.length > 0,
                    msg: `Require!`,
                  },
                ]}
                name="password"
              />
              <MessageError
                message={error && (error as any).response.data.message}
                show={!!isError}
              />
              <RippleButton
                className="submit-btn"
                type="submit"
                disabled={isDisable}
              >
                {isLoading ? <PulseLoading color="#ffffff" /> : "Login Here"}
              </RippleButton>
            </form>

            <p className="link">
              Dont Have An Account? <Link to="/signup ">Sign Here</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </Suspense>
  );
};

export default LoginPage;
