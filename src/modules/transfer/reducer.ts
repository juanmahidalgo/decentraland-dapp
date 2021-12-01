import { AnyAction } from 'redux'
import {
  TRANSFER_TOKEN_SUCESSS,
  TRANSFER_TOKEN_FAILURE,
  TransferTokenSuccessAction,
  TransferTokenFailureAction,
  TRANSFER_TOKEN_PENDING,
  TransferTokenPendingAction,
  TRANSFER_TOKEN_REQUEST,
  SET_TRANSFER_LOADING_BUTTON,
} from './actions'
import { Transfer, TransfersState, TransferStatus } from './types'

const INITIAL_STATE: TransfersState = {
  transfers: [],
  modal: {
    sendButtonLoading: false,
  },
}

export function tokenReducer(
  state: TransfersState = INITIAL_STATE,
  action: AnyAction
): TransfersState {
  switch (action.type) {
    case TRANSFER_TOKEN_REQUEST: {
      return {
        ...state,
        modal: {
          ...state.modal,
          sendButtonLoading: true,
        },
      }
    }

    case SET_TRANSFER_LOADING_BUTTON: {
      const { loading } = action.payload
      return {
        ...state,
        modal: {
          ...state.modal,
          sendButtonLoading: loading,
        },
      }
    }

    case TRANSFER_TOKEN_PENDING: {
      const { txHash, to, amount } =
        action.payload as TransferTokenPendingAction['payload']
      return {
        ...state,
        transfers: [
          ...state.transfers,
          { txHash, to, amount, status: TransferStatus.PENDING },
        ],
      }
    }

    case TRANSFER_TOKEN_SUCESSS: {
      const { txHash } = action.payload as TransferTokenSuccessAction['payload']
      const transfer = state.transfers.find(
        (t) => t.txHash === txHash
      ) as Transfer
      transfer.status = TransferStatus.SUCCESSFUL
      return {
        ...state,
        transfers: [
          ...state.transfers.filter((t) => t.txHash !== txHash),
          { ...transfer },
        ],
        modal: {
          sendButtonLoading: false,
        },
      }
    }

    case TRANSFER_TOKEN_FAILURE: {
      const { txHash, error } =
        action.payload as TransferTokenFailureAction['payload']
      const transfer = state.transfers.find(
        (t) => t.txHash === txHash
      ) as Transfer
      transfer.status = TransferStatus.REVERTED
      transfer.error = error
      return {
        ...state,
        transfers: [
          ...state.transfers.filter((t) => t.txHash !== txHash),
          { ...transfer },
        ],
        modal: {
          sendButtonLoading: false,
        },
      }
    }

    default:
      return state
  }
}
