// Get Token Balance
export const GET_TOKEN_BALANCE_REQUEST = '[Request] Get Dummy Token Balance'
export const GET_TOKEN_BALANCE_SUCESSS = '[Success] Get Dummy Token Balance'
export const GET_TOKEN_BALANCE_FAILURE = '[Failure] Get Dummy Token Balance'

export function getDummyTokenBalanceRequest() {
  return {
    type: GET_TOKEN_BALANCE_REQUEST,
    payload: {},
  }
}

export function getDummyTokenBalanceSuccess(balance: string) {
  return {
    type: GET_TOKEN_BALANCE_SUCESSS,
    payload: {
      balance,
    },
  }
}

export function getDummyTokenBalanceFailure(error: string) {
  return {
    type: GET_TOKEN_BALANCE_FAILURE,
    payload: {
      error,
    },
  }
}

export type GetDummyBalanceRequestAction = ReturnType<
  typeof getDummyTokenBalanceRequest
>
export type GetDummyBalanceSuccessAction = ReturnType<
  typeof getDummyTokenBalanceSuccess
>
export type GetDummyBalanceFailureAction = ReturnType<
  typeof getDummyTokenBalanceFailure
>
