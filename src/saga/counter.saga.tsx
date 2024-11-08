import { delay, put, takeEvery } from "redux-saga/effects";
import { increaseSagaFinish } from "../redux/counter/counter.slide";

function* handleSaga(action: any) {
  //   yield delay(2000);
  // yield put({
  //   type: "counter/increaseSagaFinish",
  //   payload: { value: 2 },
  // });

  yield put(increaseSagaFinish({ value: 2 }));
}

function* counterSaga() {
  yield takeEvery("counter/increaseSaga", handleSaga);
}

export default counterSaga;
