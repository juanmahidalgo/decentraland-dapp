import { ethers } from 'ethers'

export type TokenState = {
  tokenBalance: string | null
  isFetching: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
