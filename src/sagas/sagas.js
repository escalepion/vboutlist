import { takeLatest, put, takeEvery } from "redux-saga/effects";

import {
  ADD_GRUDGE,
  ADD_GRUDGE_SUCCESS,
  TOGGLE_FORGIVENESS,
  TOGGLE_FORGIVENESS_SUCCESS
} from './types';

export function* rootSaga() {
  yield takeLatest(ADD_GRUDGE, addGrudge);
  yield takeEvery(TOGGLE_FORGIVENESS, toggleForgiveness);
}

function* addGrudge({ payload }) {
  yield put({ type: ADD_GRUDGE_SUCCESS, payload });
}

function* toggleForgiveness({ payload }) {
  yield put({ type: TOGGLE_FORGIVENESS_SUCCESS, payload });
}