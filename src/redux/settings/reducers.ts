import { SettingsInterface } from 'models'
import { Action, Reducer } from 'redux'

export enum Actions {
  SET_STATE = 'settings/SET_STATE',
  CHANGE_SETTING = 'settings/CHANGE_SETTING',
}

export interface DispatchAction extends Action {
  payload: Partial<SettingsInterface>
}

const STORED_SETTINGS = (storedSettings: SettingsInterface): SettingsInterface => {
  const settings: SettingsInterface = { locale: 'mn-MN' }
  Object.keys(storedSettings).forEach((key) => {
    const item = localStorage.getItem(`app.settings.${key}`)
    settings[key] = item || storedSettings[key]
  })
  return settings
}

const initialState = STORED_SETTINGS({
  isMobileView: false,
  isMobileMenuOpen: false,
  isLightTheme: true,
  isSettingsOpen: false,
  isMenuTop: false,
  isMenuCollapsed: false,
  isBorderless: true,
  isSquaredBorders: false,
  isFixedWidth: false,
  isMenuShadow: true,
  locale: 'mn-MN',
})

const SettingsReducer: Reducer<SettingsInterface, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_STATE:
      return { ...state, ...action.payload }
    case Actions.CHANGE_SETTING:
      return { ...state, [action.payload.setting]: action.payload.value }
    default:
      return state
  }
}

export default SettingsReducer
