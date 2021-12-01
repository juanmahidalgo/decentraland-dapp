import { AnyAction } from 'redux'
import {
  TRANSFER_TOKEN_SUCESSS,
  TRANSFER_TOKEN_FAILURE,
  TransferTokenSuccessAction,
  TransferTokenFailureAction,
  TRANSFER_TOKEN_PENDING,
  TransferTokenPendingAction,
  TOGGLE_TRANSFER_MODAL_REQUEST,
  ToggleTransferModalRequest,
} from './actions'
import { Transfer, TransfersState, TransferStatus } from './types'

const INITIAL_STATE: TransfersState = {
  transfers: [],
  isModalOpened: false,
}

export function tokenReducer(
  state: TransfersState = INITIAL_STATE,
  action: AnyAction
): TransfersState {
  switch (action.type) {
    case TOGGLE_TRANSFER_MODAL_REQUEST: {
      const { opened } = action.payload as ToggleTransferModalRequest['payload']
      return {
        ...state,
        isModalOpened: opened,
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
        isModalOpened: false,
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
        isModalOpened: false,
      }
    }

    default:
      return state
  }
}
