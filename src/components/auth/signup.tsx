import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Input } from "../Inputs/Input";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { ImageInput } from "../Inputs/Image";
import MessageError from "./message";
import PulseLoading from "../Loading/pulse";
import RippleButton from "../RippleButton";
import { SignUpRoute, ISignUpForm } from "../../api/auth";
import { AccountCircle, AlternateEmail, Https } from "@mui/icons-material";
import Logo from "../../assests/icon.svg";
import { useMutation } from "react-query";
import "./style.scss";

const SignUpPage: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [profile, setProfile] = useState<File>(new File([""], "filename"));
  const [isDisable, setDisable] = useState(true);

  const { dispatch, LogOut } = useAuth();

  const {
    mutate: signUp,
    isLoading,
    error,
    isError,
  } = useMutation((userData: ISignUpForm) => SignUpRoute(userData), {
    onSuccess: ({ access_token }) => {
      dispatch(access_token);
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    !isDisable && signUp(new FormData(e.currentTarget));
  };

  useEffect(() => LogOut(), []);

  return (
    <div className="page-container-auth">
      <div className="info">
        <div className="logo-container">
          <img className="logo" src={Logo} alt="" />
          <h1 className="logo-name">Beatune 2.0</h1>
        </div>
        <h1 id="title">Hi, Let's Set Up Your Account</h1>
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
            <ImageInput
              input={{ name: "profile", required: true }}
              state={[profile, setProfile]}
              defaultImage={Logo}
            />
            <h1>Sign Up Page</h1>
            <Input
              state={[username, setUsername]}
              icon={AccountCircle}
              setDisable={setDisable}
              validations={(name) => [
                {
                  check: name.length > 0,
                  msg: `Require!`,
                },
              ]}
              labelText="Username"
              type="text"
              name="username"
            />
            <Input
              state={[email, setEmail]}
              labelText="Email"
              setDisable={setDisable}
              validations={(email) => [
                {
                  check: !!email
                    .toLowerCase()
                    .match(
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    ),
                  msg: "Not vaild Email",
                },
              ]}
              icon={AlternateEmail}
              type="email"
              name="email"
            />
            <Input
              state={[password, setPassword]}
              labelText="Passsword"
              setDisable={setDisable}
              icon={Https}
              validations={(value) => [
                {
                  check: value.length > 6,
                  msg: `7 characters (${value.length})`,
                },
                {
                  check: value.search(/[A-Z]/) > -1,
                  msg: "Upper cases",
                },
                {
                  check: value.search(/[0-9]/) > -1,
                  msg: "numbers",
                },
                {
                  check: value.search(/[!^*+$&+,:;=?@#]/) > -1,
                  msg: "special characters",
                },
              ]}
              type="password"
              name="password"
            />
            <MessageError
              message={error && (error as any).response.data.message}
              show={!!isError}
            />
            <RippleButton className="submit-btn" type="submit">
              {isLoading ? <PulseLoading color="#ffffff" /> : "Create User"}
            </RippleButton>
          </form>

          <p className="link">
            Already Have An Account? <Link to="/login ">Login Here</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;
