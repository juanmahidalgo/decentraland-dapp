import { expectSaga } from 'redux-saga-test-plan'
import {
  transferTokenFailure,
  transferTokenPending,
  transferTokenRequest,
  transferTokenSuccess,
} from './actions'
import {
  callTokenTransfer,
  getEtherscanLink,
  getTxByHash,
  TOAST_BASE_PROPS,
  tokenTransferSaga,
} from './sagas'
import { call } from 'redux-saga/effects'
import { showToast } from 'decentraland-dapps/dist/modules/toast/actions'

const amount = '100'
const to = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'
const baseMockedTx = {
  hash: '0x35a4923ef3df09fa0a65f25e2327482866f6d64ab23f31f069dd3dd9046c4a81',
  wait: () => Promise.resolve(),
}

describe('when the user requests a transfer', () => {
  describe('when approving the transaction', () => {
    it('should dispatch that the transfer is pending', () => {
      return expectSaga(tokenTransferSaga)
        .provide([[call(callTokenTransfer, amount, to), baseMockedTx]])
        .put(transferTokenPending(baseMockedTx.hash, amount, to))
        .dispatch(transferTokenRequest(to, amount))
        .run({ silenceTimeout: true })
    })

    describe('when receiving a pending transfer and when it finishes', () => {
      it('should dispath that the transfer was successful', () => {
        return expectSaga(tokenTransferSaga)
          .provide([[call(getTxByHash, baseMockedTx.hash), baseMockedTx]])
          .put(transferTokenSuccess(baseMockedTx.hash)) // should put a transferTokenSuccess
          .dispatch(transferTokenPending(baseMockedTx.hash, to, amount))
          .run({ silenceTimeout: true })
      })

      it('should show a toast saying that it finished successfully', () => {
        return expectSaga(tokenTransferSaga)
          .put(
            showToast({
              title: 'Transfer sent successfully!',
              body: getEtherscanLink(baseMockedTx.hash),
              ...TOAST_BASE_PROPS,
            })
          ) // should show the toast
          .dispatch(transferTokenSuccess(baseMockedTx.hash))
          .run({ silenceTimeout: true })
      })
    })

    describe('when receiving a pending transfer and when it fails', () => {
      it('should dispath that the transfer failed', () => {
        const mockedTxThatWillFail = {
          ...baseMockedTx,
          wait: () => Promise.reject('out of gas'),
        }
        return expectSaga(tokenTransferSaga)
          .provide([
            [call(getTxByHash, baseMockedTx.hash), mockedTxThatWillFail],
          ])
          .put(transferTokenFailure(mockedTxThatWillFail.hash, 'out of gas')) // should put a transferTokenFailure
          .dispatch(transferTokenPending(mockedTxThatWillFail.hash, to, amount))
          .run({ silenceTimeout: true })
      })

      it('should show a toast saying that it failed', () => {
        return expectSaga(tokenTransferSaga)
          .put(
            showToast({
              title: 'Transfer failed!',
              body: getEtherscanLink(baseMockedTx.hash),
              ...TOAST_BASE_PROPS,
            })
          ) // should show the toast
          .dispatch(transferTokenFailure(baseMockedTx.hash, ''))
          .run({ silenceTimeout: true })
      })
    })
  })
})
