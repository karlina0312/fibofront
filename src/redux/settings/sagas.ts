import { history, store as reduxStore } from 'index'
import qs from 'qs'
import { all, put, takeEvery } from 'redux-saga/effects'
import { Actions } from './reducers'

declare global {
  namespace NodeJS {
    interface Global {
      document: Document
      window: Window
      navigator: Navigator
    }
  }
}

interface ChangeSettingsProps {
  payload: { setting: string; value: string }
  type: string
}

export function* CHANGE_SETTING({ payload: { setting, value } }: ChangeSettingsProps) {
  yield localStorage.setItem(`app.settings.${setting}`, value)
  yield put({
    type: Actions.SET_STATE,
    payload: {
      [setting]: value,
    },
  })
}

export function* SETUP() {
  const changeSettings = (search: string) => {
    const query = qs.parse(search, { ignoreQueryPrefix: true })
    Object.keys(query).forEach((key) => {
      reduxStore.dispatch({
        type: Actions.CHANGE_SETTING,
        payload: {
          setting: key,
          value: query[key] === 'true',
        },
      })
    })
  }
  yield changeSettings(history.location.search)
  yield history.listen((params) => {
    const { search } = params
    changeSettings(search)
  })

  const isMobileView = (load = false) => {
    const currentState = global.window.innerWidth < 1200
    const prevState = localStorage.getItem('app.settings.isMobileView')
    if (currentState !== (prevState === 'true') || load) {
      reduxStore.dispatch({
        type: Actions.CHANGE_SETTING,
        payload: {
          setting: 'isMobileView',
          value: currentState,
        },
      })
    }
  }
  yield isMobileView(true)
  yield window.addEventListener('resize', () => {
    isMobileView()
  })
}

export default function* rootSaga() {
  yield all([takeEvery(Actions.CHANGE_SETTING, CHANGE_SETTING), SETUP()])
}
