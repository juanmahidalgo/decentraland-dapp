import { RootState } from '../types'

export const getState = (state: RootState) => state.token
export const getBalance = (state: RootState) => getState(state).tokenBalance
export const getIsFetchingTokenBalance = (state: RootState) =>
  getState(state).isFetching
