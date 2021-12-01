import { ethers } from 'ethers'

export enum TransferStatus {
  PENDING,
  SUCCESSFUL,
  REVERTED,
}

export type Transfer = {
  txHash?: string
  to: string
  amount: string
  status: TransferStatus
  error?: string | null
}

export type TransferModal = {
  sendButtonLoading: boolean
}

export type TransfersState = {
  transfers: Transfer[] // storing an array of Transfers because I thought it would be nice to show a history of the token transfers if I have some time.
  modal: TransferModal
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
