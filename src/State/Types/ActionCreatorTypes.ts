import {
  login,
  logOut,
  getDevices,
  notifyDevices,
  notifyReset,
} from "./ActionType";
import { notifyArray } from "../Types/ActionType";

export type loginAction = (email: string, password: string) => login;
export type logOutAction = () => logOut;
export type getDevicesAction = () => getDevices;
export type notifyDevicesAction = (notifyArray: notifyArray) => notifyDevices;
export type getResetNotifyAction = () => notifyReset;
