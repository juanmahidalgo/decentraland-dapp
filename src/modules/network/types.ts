import { ethers } from 'ethers'

export type NetworkState = {
  chainId: number | null
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
