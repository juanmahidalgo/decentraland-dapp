import { RootState } from '../types'

export const getState = (state: RootState) => state.token
export const getBalance = (state: RootState) => getState(state).dummyBalance
export const getIsFetchingTokenBalance = (state: RootState) =>
  getState(state).isFetching
