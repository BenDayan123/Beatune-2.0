import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "../Inputs/Input";
import { Link } from "react-router-dom";
import PulseLoading from "../Loading/pulse";
import { useAuth } from "../../hooks/useAuth";
import MessageError from "./message";
import RippleButton from "../RippleButton";
import Logo from "../../assests/logo.png";
import { SocialButton, SocialContainer } from "./social";
import {
  Apple,
  Facebook,
  Google,
  AccountCircle,
  Https,
} from "@mui/icons-material";
import "./style.scss";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState<string>("MotoMoto");
  const [password, setPassword] = useState<string>("");
  const [isDisable, setDisable] = useState(true);

  const {
    auth,
    logout,
    authState: { loading, error },
  } = useAuth();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isDisable) {
      const form = { username, password };
      auth({ form, path: "/auth/user/login" });
    }
  };

  useEffect(() => {
    logout();
  }, []);

  return (
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
              message={error ? error.response?.data.message : ""}
              show={!!error}
            />
            <RippleButton
              className="submit-btn"
              type="submit"
              disabled={isDisable}
            >
              {loading ? <PulseLoading color="#ffffff" /> : "Login Here"}
            </RippleButton>
            <SocialContainer>
              <SocialButton title="Apple" icon={Apple} />
              <SocialButton title="Facebook" icon={Facebook} />
              <SocialButton title="Google" icon={Google} />
            </SocialContainer>
          </form>

          <p className="link">
            Dont Have An Account? <Link to="/signup ">Sign Here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
