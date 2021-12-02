import { expectSaga } from 'redux-saga-test-plan'
import { connectWalletFailure, connectWalletRequest } from './actions'
import { walletSaga } from './sagas'
import { push, LOCATION_CHANGE, getLocation } from 'connected-react-router'
import { isConnected } from './selectors'
import { select } from 'redux-saga/effects'

describe('when the user requests to connect the wallet', () => {
  describe('when there is no provider injected', () => {
    it('should throw error if there is no provider injected', () => {
      return expectSaga(walletSaga)
        .put(
          connectWalletFailure(
            'missing provider (argument="provider", value=undefined, code=INVALID_ARGUMENT, version=providers/5.5.0)'
          )
        )
        .dispatch(connectWalletRequest())
        .run({ silenceTimeout: true })
    })
    it('should not redirect to /wallet', () => {
      return expectSaga(walletSaga)
        .dispatch(connectWalletRequest())
        .not.put(push('/wallet')) // the push was not call
        .run({ silenceTimeout: true })
    })
  })
})

describe('when the user tries to access /wallet', () => {
  it('should redirect to / if not connected', () => {
    return expectSaga(walletSaga)
      .provide([
        [select(isConnected), false],
        [select(getLocation), { pathname: '/wallet' }],
      ])
      .dispatch({ type: LOCATION_CHANGE })
      .put(push('/'))
      .run({ silenceTimeout: true })
  })

  it('should remain in /wallet if connected correctly', () => {
    return expectSaga(walletSaga)
      .provide([
        [select(isConnected), true],
        [select(getLocation), { pathname: '/wallet' }],
      ])
      .dispatch({ type: LOCATION_CHANGE })
      .not.put(push('/'))
      .run({ silenceTimeout: true })
  })
})
