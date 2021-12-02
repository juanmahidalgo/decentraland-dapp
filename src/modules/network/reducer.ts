import { AnyAction } from 'redux'
import { ChainChangedAction, CHAIN_CHANGED } from './actions'
import { NetworkState } from './types'

const INITIAL_STATE: NetworkState = {
  chainId: null,
}

export function networkReducer(
  state: NetworkState = INITIAL_STATE,
  action: AnyAction
): NetworkState {
  switch (action.type) {
    case CHAIN_CHANGED: {
      const { chainId } = action.payload as ChainChangedAction['payload']
      return {
        ...state,
        chainId,
      }
    }

    default:
      return state
  }
}
