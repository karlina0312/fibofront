import { UserInterface } from 'models'
import { all, call, put, takeLatest } from 'redux-saga/effects'
import { Actions } from './reducers'
import { getAuthUser, login, logout, getPublicIP } from './services'

interface LoginProps {
  payload: { email: string; password: string }
  type: string
}

export function* LOGIN({ payload: { email, password } }: LoginProps) {
  yield put({ type: Actions.SET_STATE, payload: { loading: true } })
  const success = yield call(login, email, password)
  if (success) {
    yield put({ type: Actions.GET_AUTH_USER })
  } else {
    yield put({
      type: Actions.SET_STATE,
      payload: { authorized: false, loading: false },
    })
  }
}

export function* GET_AUTH_USER() {
  yield put({ type: Actions.SET_STATE, payload: { loading: true } })
  const user = yield call(getAuthUser)
  const ipAddress = yield call(getPublicIP)
  if (user) {
    user.authorized = true
    user.loading = false
    yield put({
      type: Actions.SET_STATE,
      payload: { ...user, ipAddress },
    })
  } else {
    yield put({
      type: Actions.SET_STATE,
      payload: { authorized: false, loading: false, ipAddress },
    })
  }
}

export function* LOGOUT() {
  yield call(logout)
  const user: UserInterface = { authorized: false, loading: false }
  yield put({
    type: Actions.SET_STATE,
    payload: user,
  })
  localStorage.removeItem('token')
  window.location.href = '/'
}

export default function* rootSaga() {
  yield all([
    takeLatest(Actions.LOGIN, LOGIN),
    takeLatest(Actions.GET_AUTH_USER, GET_AUTH_USER),
    takeLatest(Actions.LOGOUT, LOGOUT),
    GET_AUTH_USER(),
  ])
}
