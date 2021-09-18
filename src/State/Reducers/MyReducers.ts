import {
  login,
  gotLoginStatus,
  logOut,
  device,
  getDevices,
  gotDevices,
  gotNotify,
} from "../Types/ActionType";

type actions =
  | login
  | gotLoginStatus
  | logOut
  | getDevices
  | gotDevices
  | gotNotify;

export interface State {
  loginStaus: boolean;
  loading: boolean;
  token: string;
  devices: device[];
  error: string;
  email: string;
  success: boolean;
  successMessage: string;
}

const initialState = {
  loginStaus: false,
  loading: false,
  email: "",
  password: "",
  token: "",
  devices: [],
  error: "",
  success: false,
  successMessage: "",
};

const HomeReducer = (state: State = initialState, action: actions) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "GOT_LOGIN_STATUS":
      return {
        ...state,
        loading: false,
        loginStaus: action.status,
        error: action.error,
        token: action.token,
        email: action.email,
        password: action.password,
      };
    case "LOG_OUT":
      return {
        ...state,
        loginStaus: false,
        loading: false,
        email: "",
        password: "",
        token: "",
        devices: [],
        error: "",
        success: false,
        successMessage: "",
      };
    case "GET_DEVICES":
      return {
        ...state,
        loading: true,
      };
    case "GOT_DEVICES":
      return {
        ...state,
        loading: false,
        devices: action.devices,
        error: action.devicesError,
        successMessage: "",
      };
    case "GOT_NOTIFY_DEVICES":
      return {
        ...state,
        loading: false,
        success: action.success,
        successMessage: action.successMessage,
        error: action.error,
      };
    default:
      return state;
  }
};

export default HomeReducer;
