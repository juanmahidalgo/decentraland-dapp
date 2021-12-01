// Get Token Balance
export const GET_TOKEN_BALANCE_REQUEST = '[Request] Get Token Balance'
export const GET_TOKEN_BALANCE_SUCESSS = '[Success] Get Token Balance'
export const GET_TOKEN_BALANCE_FAILURE = '[Failure] Get Token Balance'

// Token Balance
export function getTokenBalanceRequest() {
  return {
    type: GET_TOKEN_BALANCE_REQUEST,
    payload: {},
  }
}

export function getTokenBalanceSuccess(balance: string) {
  return {
    type: GET_TOKEN_BALANCE_SUCESSS,
    payload: {
      balance,
    },
  }
}

export function getTokenBalanceFailure(error: string) {
  return {
    type: GET_TOKEN_BALANCE_FAILURE,
    payload: {
      error,
    },
  }
}

// Token Balance
export type GetBalanceRequestAction = ReturnType<typeof getTokenBalanceRequest>
export type GetBalanceSuccessAction = ReturnType<typeof getTokenBalanceSuccess>
export type GetBalanceFailureAction = ReturnType<typeof getTokenBalanceFailure>
