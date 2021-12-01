// Transfer Token
export const TOGGLE_TRANSFER_MODAL_REQUEST = '[Request] Toggle Transfer Modal'
export const TRANSFER_TOKEN_REQUEST = '[Request] Transfer Token'
export const TRANSFER_TOKEN_PENDING = '[Pending] Transfer Token'
export const TRANSFER_TOKEN_SUCESSS = '[Success] Transfer Token'
export const TRANSFER_TOKEN_FAILURE = '[Failure] Transfer Token'

// Token transfer
export function transferTokenRequest(to: string, amount: string) {
  return {
    type: TRANSFER_TOKEN_REQUEST,
    payload: {
      to,
      amount,
    },
  }
}

export function transferTokenPending(
  txHash: string,
  amount: string,
  to: string
) {
  return {
    type: TRANSFER_TOKEN_PENDING,
    payload: { txHash, amount, to },
  }
}

export function transferTokenSuccess(txHash: string) {
  return {
    type: TRANSFER_TOKEN_SUCESSS,
    payload: { txHash },
  }
}

export function transferTokenFailure(txHash: string, error: string) {
  return {
    type: TRANSFER_TOKEN_FAILURE,
    payload: {
      txHash,
      error,
    },
  }
}

export function toggleTransferModalRequest(opened: boolean) {
  return {
    type: TOGGLE_TRANSFER_MODAL_REQUEST,
    payload: {
      opened,
    },
  }
}

// Token Transfer
export type TransferTokenRequestAction = ReturnType<typeof transferTokenRequest>
export type TransferTokenPendingAction = ReturnType<typeof transferTokenPending>
export type TransferTokenSuccessAction = ReturnType<typeof transferTokenSuccess>
export type TransferTokenFailureAction = ReturnType<typeof transferTokenFailure>
export type ToggleTransferModalRequest = ReturnType<
  typeof toggleTransferModalRequest
>
