import { all } from 'redux-saga/effects'
import User from './user/sagas'
import Settings from './settings/sagas'

export default function* rootSaga() {
  yield all([User(), Settings()])
}
