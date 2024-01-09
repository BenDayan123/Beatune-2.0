import { IUser } from "../interfaces";
import axios from "axios";

export interface ILoginForm {
  username: string;
  password: string;
}

export interface ISignUpForm extends FormData {}
// export interface ISignUpForm extends ILoginForm {
//   email: string;
//   profile: File;
// }

export type GenericResponse = {
  access_token: string;
};

export const SignUpRoute = async (form: ISignUpForm) => {
  return (await axios.post<GenericResponse>("/auth/user/signup", form)).data;
};

export const LoginRoute = async (form: ILoginForm) => {
  return (await axios.post<GenericResponse>("/auth/user/login", form)).data;
};

export const GetUserRoute = async () => {
  return (await axios.get<IUser>("/user")).data;
};
