import { combineReducers } from 'redux'
import { walletReducer as wallet } from './wallet/reducer'
import { tokenReducer as token } from './token/reducer'
import { tokenReducer as transfers } from './transfer/reducer'
import { toastReducer as toast } from 'decentraland-dapps/dist/modules/toast/reducer'

export const reducer = combineReducers({
  wallet,
  token,
  transfers,
  toast,
})
