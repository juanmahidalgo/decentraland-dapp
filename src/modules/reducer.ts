import { combineReducers } from 'redux'
import { walletReducer as wallet } from './wallet/reducer'
import { tokenReducer as token } from './token/reducer'

export const reducer = combineReducers({
  wallet,
  token,
})
