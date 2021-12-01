import { RootState } from '../types'
import { TransferStatus } from './types'

export const getState = (state: RootState) => state.transfers

export const getIsTransferButtonLoading = (state: RootState) =>
  getState(state).modal.sendButtonLoading

export const getLatestTransfer = (state: RootState) =>
  getState(state).transfers[getState(state).transfers.length - 1]

export const getPendingTransfers = (state: RootState) =>
  getState(state).transfers.filter((tx) => tx.status === TransferStatus.PENDING)

export const getActiveTransfer = (state: RootState) => {
  return getState(state).transfers.find(
    (tx) => !tx.txHash || tx.status === TransferStatus.PENDING
  )
}
