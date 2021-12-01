import { all } from '@redux-saga/core/effects'
import { dummyTokenSaga } from './token/sagas'
import { tokenTransferSaga } from './transfer/sagas'
import { walletSaga } from './wallet/sagas'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'

export function* sagas() {
  yield all([toastSaga(), walletSaga(), dummyTokenSaga(), tokenTransferSaga()])
}
