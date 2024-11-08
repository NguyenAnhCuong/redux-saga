import { call, delay, put, takeEvery } from "redux-saga/effects";
import { IUser } from "../type/backend";
import {
  createUserFailed,
  createUserPending,
  createUserSuccess,
  fetchUserFailed,
  fetchUserPending,
  fetchUserSuccess,
} from "../redux/user/user.slide";
import { PayloadAction } from "@reduxjs/toolkit";

const fetchUser = async () => {
  const res = await fetch("http://localhost:8000/users");
  return res.json();
};

const createUser = async (email: string, name: string) => {
  const res = await fetch("http://localhost:8000/users", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      name: name,
    }),
    headers: {
      "Content-Type": " application/json",
    },
  });
  return res.json();
};

function* handleFetchUser(action: any) {
  try {
    const users: IUser[] = yield call(fetchUser);
    yield put(fetchUserSuccess(users));
  } catch (error) {
    yield put(fetchUserFailed());
  }
}

function* handleCreateUser(
  action: PayloadAction<{ email: string; name: string }>
) {
  try {
    yield call(createUser, action.payload.email, action.payload.name);
    yield put(createUserSuccess());
    yield put(fetchUserPending());
  } catch (error) {
    yield put(createUserFailed());
  }
}

function* userSaga() {
  yield takeEvery(fetchUserPending, handleFetchUser);
  yield takeEvery(createUserPending, handleCreateUser);
}

export default userSaga;
