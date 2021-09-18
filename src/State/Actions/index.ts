import {
  loginAction,
  logOutAction,
  getDevicesAction,
  notifyDevicesAction,
} from "../Types/ActionCreatorTypes";
import { notifyArray } from "../Types/ActionType";

export const logIn: loginAction = (email: string, password: string) => {
  return {
    type: "LOGIN",
    email,
    password,
  };
};

export const logOut: logOutAction = () => {
  return {
    type: "LOG_OUT",
  };
};

export const getDevices: getDevicesAction = () => {
  return {
    type: "GET_DEVICES",
  };
};

export const notifyDevices: notifyDevicesAction = (
  notifyArray: notifyArray
) => {
  return {
    type: "NOTIFY_DEVICES",
    notifyArray: notifyArray,
  };
};
