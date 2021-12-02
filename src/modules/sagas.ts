import { all } from '@redux-saga/core/effects'
import { tokenSaga } from './token/sagas'
import { tokenTransferSaga } from './transfer/sagas'
import { walletSaga } from './wallet/sagas'
import { toastSaga } from 'decentraland-dapps/dist/modules/toast/sagas'
import { networkSaga } from './network/sagas'

export function* sagas() {
  yield all([
    toastSaga(),
    walletSaga(),
    tokenSaga(),
    tokenTransferSaga(),
    networkSaga(),
  ])
}
