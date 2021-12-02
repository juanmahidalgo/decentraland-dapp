export const GET_CHAIN_REQUEST = '[Request] Get Chain'
export const CHAIN_CHANGED = 'Chain changed'

export function getChain() {
  return {
    type: GET_CHAIN_REQUEST,
    payload: {},
  }
}

export function chainChanged(chainId: number) {
  return {
    type: CHAIN_CHANGED,
    payload: {
      chainId,
    },
  }
}

export type GetChainAction = ReturnType<typeof getChain>
export type ChainChangedAction = ReturnType<typeof chainChanged>
