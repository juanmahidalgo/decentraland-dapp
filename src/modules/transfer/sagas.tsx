import { ethers } from 'ethers'
import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import {
  transferTokenFailure,
  transferTokenPending,
  TransferTokenRequestAction,
  transferTokenSuccess,
  TransferTokenSuccessAction,
  TRANSFER_TOKEN_REQUEST,
  TRANSFER_TOKEN_SUCESSS,
} from './actions'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { WindowWithEthereum } from './types'
import { showToast } from 'decentraland-dapps/dist/modules/toast/actions'
import { ChainId } from '../types'
import { getAddress } from '../wallet/selectors'

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

export function* tokenTransferSaga() {
  yield all([toastSaga(), customTokenTransferSaga()])
}

export function* customTokenTransferSaga() {
  yield takeEvery(TRANSFER_TOKEN_REQUEST, handleTokenTransfer)
  yield takeEvery(TRANSFER_TOKEN_SUCESSS, handleTokenTransferSuccess)
}

function* handleTokenTransferSuccess(action: TransferTokenSuccessAction) {
  console.log('handeling success!!')
  const {
    payload: { txHash },
  } = action
  // TODO: use a util to build the current network tx
  yield put(
    showToast({
      title: 'Transfer sent successfully!',
      body: (
        <a
          href={`https://etherscan.io/tx/${txHash}`}
          target="_blank"
          rel="noreferrer"
        >
          Open in Etherscan
        </a>
      ),
    })
  )
}

function* handleTokenTransfer(action: TransferTokenRequestAction) {
  try {
    const {
      payload: { amount, to },
    } = action
    console.log('Transferring!!!')
    console.log('amount: ', amount)
    console.log('to: ', to)
    // const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const provider = new ethers.providers.Web3Provider(
      windowWithEthereum.ethereum
    )
    const signer = provider.getSigner()
    const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, signer)
    const tx: TransactionResponse = yield call(() => token.transfer(to, amount))
    yield put(transferTokenPending(tx.hash, amount, to))
    console.log('tx: ', tx)
    const txReceipt: TransactionReceipt = yield call(() => tx.wait())
    console.log('txReceipt: ', txReceipt)
    const chainId: ChainId = yield call(() => signer.getChainId())
    console.log('chainId: ', chainId)
    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    // yield put(transferTokenSuccess(chainId, tx.hash, address))
    yield put(transferTokenSuccess(tx.hash))
  } catch (error: any) {
    console.log('error: ', error)
    yield put(transferTokenFailure('tx.hash', 'Tx failed'))
  }
}
