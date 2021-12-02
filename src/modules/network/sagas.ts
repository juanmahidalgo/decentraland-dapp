import { ethers } from 'ethers'
import { call, put, takeEvery } from 'redux-saga/effects'

import { chainChanged, GET_CHAIN_REQUEST } from './actions'
import { WindowWithEthereum } from './types'

const windowWithEthereum = window as unknown as WindowWithEthereum

type ChainData = { chainId: number; name: string }

export function* networkSaga() {
  yield takeEvery(GET_CHAIN_REQUEST, handleGetChain)
}

export function* getNetworkFromProvider() {
  const provider = new ethers.providers.Web3Provider(
    windowWithEthereum.ethereum
  )
  const networkId: ChainData = yield call(() => provider.getNetwork())
  return networkId
}

export function* handleGetChain() {
  const newChainData: ChainData = yield call(getNetworkFromProvider)
  yield put(chainChanged(newChainData.chainId))
}
