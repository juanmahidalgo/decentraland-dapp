import { combineReducers } from 'redux'
import { walletReducer as wallet } from './wallet/reducer'
import { tokenReducer as token } from './token/reducer'
import { tokenReducer as transfers } from './transfer/reducer'
import { toastReducer as toast } from 'decentraland-dapps/dist/modules/toast/reducer'
import { networkReducer as network } from './network/reducer'
import { connectRouter } from 'connected-react-router'

const mainReducers = {
  wallet,
  token,
  transfers,
  toast,
  network,
}

export const baseReducers = combineReducers(mainReducers)

// TODO: get the history correct type
export const reducer = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    ...mainReducers,
  })
