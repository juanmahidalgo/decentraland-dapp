import { expectSaga } from 'redux-saga-test-plan'
import { getNetworkFromProvider, networkSaga } from './sagas'
import { chainChanged, getChain } from './actions'
import { call } from 'redux-saga/effects'

const mockedChainId = { chainId: 1337 }

describe('when the user changes the network', () => {
  it('should detec the new network to check if its supported', () => {
    return expectSaga(networkSaga)
      .provide([[call(getNetworkFromProvider), mockedChainId]])
      .put(chainChanged(mockedChainId.chainId))
      .dispatch(getChain())
      .run({ silenceTimeout: true })
  })
})
