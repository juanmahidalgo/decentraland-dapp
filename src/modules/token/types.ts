import { ethers } from 'ethers'

export type TokenState = {
  tokenBalance: string | null
  isFetching: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}

// The regular `window` object with `ethereum` injected by MetaMask
export const windowWithEthereum = window as unknown as WindowWithEthereum
