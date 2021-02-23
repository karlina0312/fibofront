import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { History } from 'history'
import UserReducer from './user/reducers'
import SettingsReducer from './settings/reducers'

const Reducers = (history: History) =>
  combineReducers({
    router: connectRouter(history),
    UserReducer,
    SettingsReducer,
  })

export default Reducers
