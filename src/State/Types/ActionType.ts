export interface device {
  id: number;
  name: string;
}

export interface notifyArray {
  name: string;
  email: string;
  repoUrl: string;
  message: string;
  token: string;
}

//For Action creator
export interface login {
  type: "LOGIN";
  email: string;
  password: string;
}

export interface logOut {
  type: "LOG_OUT";
}

export interface notifyReset {
  type: "RESET_NOTIFY";
}

export interface getDevices {
  type: "GET_DEVICES";
}

export interface notifyDevices {
  type: "NOTIFY_DEVICES";
  notifyArray: notifyArray;
}

//for reducer
export interface gotLoginStatus {
  type: "GOT_LOGIN_STATUS";
  status?: boolean;
  error?: string;
  token?: string;
  email?: string;
  password?: string;
}

export interface gotDevices {
  type: "GOT_DEVICES";
  devices?: device[];
  devicesError?: string | undefined;
}

export interface gotNotify {
  type: "GOT_NOTIFY_DEVICES";
  error?: string;
  success?: boolean;
  successMessage?: string;
}

//for saga actions
export const actionIds = {
  LOGIN: "LOGIN",
  GET_DEVICES: "GET_DEVICES",
  NOTIFYDEVICES: "NOTIFY_DEVICES",
};
