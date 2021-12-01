import { ethers } from 'ethers'
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'
import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  setTransferModalButtonLoading,
  transferTokenFailure,
  transferTokenPending,
  TransferTokenRequestAction,
  transferTokenSuccess,
  TransferTokenSuccessAction,
  TRANSFER_TOKEN_FAILURE,
  TRANSFER_TOKEN_REQUEST,
  TRANSFER_TOKEN_SUCESSS,
} from './actions'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { WindowWithEthereum } from './types'
import { showToast } from 'decentraland-dapps/dist/modules/toast/actions'

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

const TOAST_BASE_PROPS = {
  closable: true,
  timeout: 2000,
}

export function* tokenTransferSaga() {
  yield all([toastSaga(), customTokenTransferSaga()])
}

export function* customTokenTransferSaga() {
  yield takeEvery(TRANSFER_TOKEN_REQUEST, handleTokenTransfer)
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
      title: 'Transfer sent successfully!',
      body: getEtherscanLink(txHash),
      ...TOAST_BASE_PROPS,
    })
  )
}

function* handleTokenTransferFailure(action: TransferTokenSuccessAction) {
  const {
    payload: { txHash },
  } = action
  // TODO: use a util to build the current network tx
  yield put(
    showToast({
      title: 'Transfer failed!',
      body: getEtherscanLink(txHash),
      ...TOAST_BASE_PROPS,
    })
  )
}

const getEtherscanLink = (txHash: string) => (
  <a
    href={`https://etherscan.io/tx/${txHash}`}
    target="_blank"
    rel="noreferrer"
  >
    Open in Etherscan
  </a>
)

function* handleTokenTransfer(action: TransferTokenRequestAction) {
  try {
    const {
      payload: { amount, to },
    } = action
    const provider = new ethers.providers.Web3Provider(
      windowWithEthereum.ethereum
    )
    const signer = provider.getSigner()
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const tx: TransactionResponse = yield call(() => token.transfer(to, amount))
    yield put(transferTokenPending(tx.hash, amount, to))
    try {
      console.log('tx: ', tx)
      const txReceipt: TransactionReceipt = yield call(() => tx.wait())
      console.log('txReceipt: ', txReceipt)
      yield put(transferTokenSuccess(tx.hash))
    } catch (error) {
      yield put(transferTokenFailure('tx.hash', 'Tx failed'))
    }
  } catch (error: any) {
    console.log('error: ', error)
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
