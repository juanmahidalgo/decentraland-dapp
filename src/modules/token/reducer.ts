import { AnyAction } from 'redux'
import {
  GET_TOKEN_BALANCE_REQUEST,
  GET_TOKEN_BALANCE_SUCESSS,
  GET_TOKEN_BALANCE_FAILURE,
  GetBalanceSuccessAction,
  GetBalanceFailureAction,
} from './actions'
import { TokenState } from './types'

const INITIAL_STATE: TokenState = {
  isFetching: false,
  error: null,
  tokenBalance: null,
}

export function tokenReducer(
  state: TokenState = INITIAL_STATE,
  action: AnyAction
): TokenState {
  switch (action.type) {
    case GET_TOKEN_BALANCE_REQUEST: {
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    }
    case GET_TOKEN_BALANCE_SUCESSS: {
      const { balance } = action.payload as GetBalanceSuccessAction['payload']
      return {
        ...state,
        isFetching: false,
        tokenBalance: balance,
        error: null,
      }
    }

    case GET_TOKEN_BALANCE_FAILURE: {
      const { error } = action.payload as GetBalanceFailureAction['payload']
      return {
        ...state,
        isFetching: false,
        error,
      }
    }

    default:
      return state
  }
}
