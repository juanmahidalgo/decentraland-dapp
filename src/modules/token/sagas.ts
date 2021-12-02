import { ethers } from 'ethers'
import { call, put, select, takeEvery } from 'redux-saga/effects'
import { TRANSFER_TOKEN_SUCESSS } from '../transfer/actions'
import { CONNECT_WALLET_SUCCESS } from '../wallet/actions'
import { getAddress } from '../wallet/selectors'
import {
  getTokenBalanceFailure,
  getTokenBalanceRequest,
  getTokenBalanceSuccess,
  GET_TOKEN_BALANCE_REQUEST,
} from './actions'
import { WindowWithEthereum } from './types'

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

export function* tokenSaga() {
  yield takeEvery(
    [CONNECT_WALLET_SUCCESS, TRANSFER_TOKEN_SUCESSS],
    function* () {
      yield put(getTokenBalanceRequest())
    }
  )
  yield takeEvery(
    GET_TOKEN_BALANCE_REQUEST,
    handleGetTokenBalanceRequestHandler
  )
}

export function* getFormattedTokenBalance(address: string) {
  const provider = new ethers.providers.Web3Provider(
    windowWithEthereum.ethereum
  )
  const token = new ethers.Contract(TOKEN_ADDRESS, TOKEN_ABI, provider)
  const balance: number = yield call(() => token.balanceOf(address))
  return balance.toString()
}

function* handleGetTokenBalanceRequestHandler() {
  try {
    const address: ReturnType<typeof getAddress> = yield select(getAddress)
    const formattedBalance: string = yield call(
      getFormattedTokenBalance,
      address
    )
    // const formattedBalance = ethers.utils.formatEther(balance) // in case the token uses wei
    yield put(getTokenBalanceSuccess(formattedBalance))
  } catch (error: any) {
    yield put(getTokenBalanceFailure(error.message))
  }
}
