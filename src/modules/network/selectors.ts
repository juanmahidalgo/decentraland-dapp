import { RootState } from '../types'

export const getState = (state: RootState) => state.network
export const getChainId = (state: RootState) => getState(state).chainId
