import { ethers } from 'ethers'
import { TransactionResponse } from '@ethersproject/providers'
import { call, put, takeEvery } from 'redux-saga/effects'
import {
  setTransferModalButtonLoading,
  transferTokenFailure,
  TransferTokenFailureAction,
  transferTokenPending,
  TransferTokenPendingAction,
  TransferTokenRequestAction,
  transferTokenSuccess,
  TransferTokenSuccessAction,
  TRANSFER_TOKEN_FAILURE,
  TRANSFER_TOKEN_PENDING,
  TRANSFER_TOKEN_REQUEST,
  TRANSFER_TOKEN_SUCESSS,
} from './actions'
import { push } from 'connected-react-router'

import { WindowWithEthereum } from './types'
import { showToast } from 'decentraland-dapps/dist/modules/toast/actions'
import { NETWORK_ID_ETHERSCAN_MAP, supportedChain } from '../../utils/networks'

// The regular `window` object with `ethereum` injected by MetaMask
const windowWithEthereum = window as unknown as WindowWithEthereum

/* This is the Dummy Token address, it identifies the token contract once deployed */
export const TOKEN_ADDRESS = process.env.REACT_APP_TOKEN_ADDRESS!
if (!TOKEN_ADDRESS) {
  console.error(`Missing env variable REACT_APP_TOKEN_ADDRESS`)
}

export const TOKEN_ABI = [
  'function symbol() view returns (string)',
  'function balanceOf(address) view returns (uint)',
  'function transfer(address to, uint amount)',
]

export const TOAST_BASE_PROPS = {
  closable: true,
  timeout: 2000,
}

export function* tokenTransferSaga() {
  yield takeEvery(TRANSFER_TOKEN_REQUEST, handleTokenTransferRequest)
  yield takeEvery(TRANSFER_TOKEN_PENDING, handlePendingTransfer)
  yield takeEvery(TRANSFER_TOKEN_SUCESSS, handleTokenTransferSuccess)
  yield takeEvery(TRANSFER_TOKEN_FAILURE, handleTokenTransferFailure)
}

function* handleTokenTransferSuccess(action: TransferTokenSuccessAction) {
  const {
    payload: { txHash },
  } = action
  // TODO: use a util to build the current network tx
  yield put(
    showToast({
      title: 'Transfer sent!',
      body: getEtherscanLink(txHash),
      ...TOAST_BASE_PROPS,
    })
  )
}

function* handleTokenTransferFailure(action: TransferTokenFailureAction) {
  const {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    payload: { txHash, error },
  } = action
  // TODO: log this error
  // TODO: use a util to build the current network tx
  yield put(
    showToast({
      title: 'Transfer failed!',
      body: getEtherscanLink(txHash),
      ...TOAST_BASE_PROPS,
    })
  )
}

export const getEtherscanLink = (txHash: string) => {
  const link = `https://${NETWORK_ID_ETHERSCAN_MAP[supportedChain]}.etherscan.io/tx/${txHash}`
  return (
    <a href={link} target="_blank" rel="noreferrer">
      Open in Etherscan
    </a>
  )
}

export function* callTokenTransfer(amount: string, to: string) {
  const provider = new ethers.providers.Web3Provider(
    windowWithEthereum.ethereum
  )
  const signer = provider.getSigner()
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)
  const tx: TransactionResponse = yield call(() => token.transfer(to, amount))
  return tx
}

function* handleTokenTransferRequest(action: TransferTokenRequestAction) {
  try {
    const {
      payload: { amount, to },
    } = action
    const tx: TransactionResponse = yield call(callTokenTransfer, amount, to)
    yield put(transferTokenPending(tx.hash, amount, to))
  } catch (error: any) {
    yield put(
      showToast({
        title: 'Transfer rejected!',
        body: 'The transaction was rejected',
        ...TOAST_BASE_PROPS,
      })
    )
    yield put(setTransferModalButtonLoading(false))
  }
}

export function* getTxByHash(txHash: string) {
  const provider = new ethers.providers.Web3Provider(
    windowWithEthereum.ethereum
  )
  const tx: TransactionResponse = yield call(() =>
    provider.getTransaction(txHash)
  )
  return tx
}

function* handlePendingTransfer(action: TransferTokenPendingAction) {
  const {
    payload: { txHash },
  } = action
  try {
    const tx: TransactionResponse = yield call(getTxByHash, txHash)
    yield call(tx.wait)
    yield put(transferTokenSuccess(tx.hash))
  } catch (error: any) {
    // TODO type this error correctly
    yield put(transferTokenFailure(txHash, error))
  } finally {
    yield put(push('/wallet'))
  }
}
