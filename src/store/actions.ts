import { User } from "./types";


export const logIn = (payload: User) => ({
  type: 'LOG_IN',
  payload,
});

export const logOut = () => ({
  type: 'LOG_OUT',
});