import { take, call, put, fork } from "redux-saga/effects";
import { loginPending, logout } from "../redux/user/user.slide";
import { PayloadAction } from "@reduxjs/toolkit";
import { ILogin } from "../type/backend";

const authorize = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "abc@gmail.com" && password === "123456") {
        localStorage.setItem("access_token", "eric");
        resolve("ok");
      }
      resolve("nothing");
    }, 3000);
  });
};

function* authSaga() {
  while (true) {
    const action: PayloadAction<ILogin> = yield take(loginPending);
    yield fork(authorize, action.payload.email, action.payload.password);

    yield take(logout);
  }
}

export default authSaga;
