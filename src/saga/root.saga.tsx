import { all } from "redux-saga/effects";
import counterSaga from "./counter.saga";
import userSaga from "./user.saga";
import authSaga from "./auth.saga";

function* RootSaga() {
  yield all([counterSaga(), userSaga(), authSaga()]);
}
export default RootSaga;
