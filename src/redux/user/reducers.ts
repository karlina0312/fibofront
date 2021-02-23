import { Reducer, Action } from 'redux'
import { UserInterface } from 'models'

export enum Actions {
  SET_STATE = 'user/SET_STATE',
  LOGIN = 'user/LOGIN',
  REGISTER = 'user/REGISTER',
  LOGOUT = 'user/LOGOUT',
  PASSWORD = 'user/PASSWORD_CHANGE',
  GET_AUTH_USER = 'user/GET_AUTH_USER',
}

export interface DispatchAction extends Action {
  payload: Partial<UserInterface>
}

const initialState: UserInterface = {
  loading: false,
  authorized: false,
  ipAddress: '',
}

const UserReducer: Reducer<UserInterface, DispatchAction> = (state = initialState, action) => {
  switch (action.type) {
    case Actions.SET_STATE:
      return { ...state, ...action.payload }
    default:
      return state
  }
}

export default UserReducer
