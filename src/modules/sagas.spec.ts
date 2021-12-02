import { expectSaga } from 'redux-saga-test-plan'
import { call } from 'redux-saga/effects'
import { sagas } from './sagas'
import { getTokenBalanceRequest } from './token/actions'
import { ACCOUNT_CHANGED, connectWalletRequest } from './wallet/actions'
import { getAddressFromProvider } from './wallet/sagas'

// The idea here is to test how the sagas communicate with each other

const mockedAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'

describe('when the user changes the account', () => {
  it('should dispatch the connect wallet and fetch the token balance again', () => {
    return expectSaga(sagas)
      .provide([[call(getAddressFromProvider), mockedAddress]])
      .dispatch({ type: ACCOUNT_CHANGED })
      .put(connectWalletRequest())
      .put(getTokenBalanceRequest())
      .run({ silenceTimeout: true })
  })
})
