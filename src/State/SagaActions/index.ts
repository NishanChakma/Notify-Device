import {
  takeEvery,
  put,
  call,
  StrictEffect,
  take,
  race,
  delay,
} from "redux-saga/effects";
import { actionIds } from "../Types/ActionType";
import { AxiosResponse } from "axios";
import { gotLoginStatus, gotDevices, gotNotify } from "../Types/ActionType";
import { login, notifyDevices } from "../Types/ActionType";
import { callApi } from "../Api";
import { REHYDRATE } from "redux-persist/lib/constants";

// watchers
function* SagaActions(): Generator<StrictEffect> {
  yield take(REHYDRATE);
  yield takeEvery(actionIds.LOGIN, getLoginStatus);
  yield takeEvery(actionIds.NOTIFYDEVICES, notifyDevice);
  yield call(watchStartBackgroundTask);
}

// workers
function* getLoginStatus({ email, password }: login) {
  try {
    let data = {
      email,
      password,
    };
    const response: AxiosResponse = yield call(() =>
      callApi.post("login", data)
    );
    switch (response.status) {
      case 200:
        const data: gotLoginStatus = {
          type: "GOT_LOGIN_STATUS",
          status: true,
          token: response.data,
          email: email,
          password: password,
        };
        yield put(data);
    }
  } catch (err: any) {
    // console.log("err.response.status", err.response.status);
    if (err.response.status === 401) {
      const error: gotLoginStatus = {
        type: "GOT_LOGIN_STATUS",
        status: false,
        error: "Unauthorized! Invalid email and password combination",
      };
      yield put(error);
    }
  }
}

function* fetchDevices() {
  while (true) {
    const response: AxiosResponse = yield call(() => callApi.get("devices"));
    if (response) {
      const res: gotDevices = {
        type: "GOT_DEVICES",
        devices: response.data.devices,
      };
      yield put(res);
    } else {
      const res: gotDevices = {
        type: "GOT_DEVICES",
        devicesError: "error while fetch post",
      };
      yield put(res);
    }
    yield delay(5000); //this will call api every 5 seconds
  }
}

function* watchStartBackgroundTask() {
  while (true) {
    yield take(actionIds.GET_DEVICES);
    yield race({
      task: call(fetchDevices),
      cancel: take("LOG_OUT"),
    });
  }
}

function* notifyDevice({
  notifyArray: { name, email, repoUrl, message, token },
}: notifyDevices) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    let data = {
      name: name,
      email: email,
      repoUrl: repoUrl,
      message: message,
    };
    const response: AxiosResponse = yield call(() =>
      callApi.post("notify", data, {
        headers: headers,
      })
    );

    switch (response.status) {
      case 201:
        const res: gotNotify = {
          type: "GOT_NOTIFY_DEVICES",
          success: true,
          successMessage: "Notification has been sent.",
        };
        yield put(res);
    }
  } catch (err: any) {
    if (err.response.status === 401) {
      const error: gotNotify = {
        type: "GOT_NOTIFY_DEVICES",
        error: "Unauthorized! Invalid authorization token",
        success: false,
      };
      yield put(error);
    }
    if (err.response.status === 400) {
      const error: gotNotify = {
        type: "GOT_NOTIFY_DEVICES",
        error: "Bad request! Missing authorization token",
        success: false,
      };
      yield put(error);
    }
  }
}

export default SagaActions;
