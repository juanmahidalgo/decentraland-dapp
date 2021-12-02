import { expectSaga } from 'redux-saga-test-plan'
import {
  getTokenBalanceFailure,
  getTokenBalanceRequest,
  getTokenBalanceSuccess,
} from './actions'
import { getFormattedTokenBalance, tokenSaga } from './sagas'
import { call, select } from 'redux-saga/effects'
import { connectWalletSuccess } from '../wallet/actions'
import { getAddress } from '../wallet/selectors'
import { throwError } from 'redux-saga-test-plan/providers'
import { transferTokenSuccess } from '../transfer/actions'

const mockedAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
const mockedBalance = '200'

describe('when connecting the wallet', () => {
  it('should dispatch the request to fetch balance', () => {
    return expectSaga(tokenSaga)
      .put(getTokenBalanceRequest())
      .dispatch(connectWalletSuccess(mockedAddress))
      .run({ silenceTimeout: true })
  })
})

describe('when a transfer is done', () => {
  it('should dispatch the request to fetch balance', () => {
    return expectSaga(tokenSaga)
      .put(getTokenBalanceRequest())
      .dispatch(transferTokenSuccess('fakeHash'))
      .run({ silenceTimeout: true })
  })
})

describe('when receiving the fetch balance request', () => {
  it('should dispatch the success action if getting the balance does not fail', () => {
    return expectSaga(tokenSaga)
      .provide([
        [call(getFormattedTokenBalance, mockedAddress), mockedBalance],
        [select(getAddress), mockedAddress],
      ])
      .put(getTokenBalanceSuccess(mockedBalance))
      .dispatch(getTokenBalanceRequest())
      .run({ silenceTimeout: true })
  })

  it('should dispatch the failure action if getting the balance fails', () => {
    const mockedErrorMessage = 'failed to get the balance'
    return expectSaga(tokenSaga)
      .provide([
        [
          call(getFormattedTokenBalance, mockedAddress),
          throwError(new Error(mockedErrorMessage)),
        ],
        [select(getAddress), mockedAddress],
      ])
      .put(getTokenBalanceFailure(mockedErrorMessage))
      .dispatch(getTokenBalanceRequest())
      .run({ silenceTimeout: true })
  })
})
