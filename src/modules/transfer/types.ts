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
  opened: boolean
  sendButtonLoading: boolean
}

export type TransfersState = {
  transfers: Transfer[]
  modal: TransferModal
}

export type WindowWithEthereum = Window & {
  ethereum: ethers.providers.ExternalProvider
}
