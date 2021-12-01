import { ethers } from 'ethers'

export type WalletState = {
  address: string | null
  tokenBalance: string | null
  isConnecting: boolean
  error: string | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
