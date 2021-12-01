import { all } from '@redux-saga/core/effects'
import { dummyTokenSaga } from './token/sagas'
import { tokenTransferSaga } from './transfer/sagas'
import { walletSaga } from './wallet/sagas'

export function* sagas() {
  yield all([walletSaga(), dummyTokenSaga(), tokenTransferSaga()])
}
