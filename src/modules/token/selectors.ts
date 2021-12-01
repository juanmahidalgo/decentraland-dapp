import { RootState } from '../types'

export const getState = (state: RootState) => state.token
export const getDummyBalance = (state: RootState) =>
  getState(state).dummyBalance
export const getIsFetchingDummyTokenBalance = (state: RootState) =>
  getState(state).isFetching
