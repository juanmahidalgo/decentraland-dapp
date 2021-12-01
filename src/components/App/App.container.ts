import { connect } from 'react-redux'
import { connectWalletRequest } from '../../modules/wallet/actions'
import {
  getAddress,
  getError,
  isConnected,
  isConnecting,
} from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types'
import App from './App'
import {
  getDummyBalance,
  getIsFetchingDummyTokenBalance,
} from '../../modules/token/selectors'
import {
  getIsTransferModalOpened,
  getPendingTransfers,
} from '../../modules/transfer/selectors'
import { toggleTransferModalRequest } from '../../modules/transfer/actions'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  isConnected: isConnected(state),
  isConnecting: isConnecting(state),
  error: getError(state),
  dummyBalance: getDummyBalance(state),
  isFetchingDummyTokenBalance: getIsFetchingDummyTokenBalance(state),
  pendingTransactions: getPendingTransfers(state),
  isTransferModalOpened: getIsTransferModalOpened(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onOpenTransferModal: (opened: boolean) =>
    dispatch(toggleTransferModalRequest(opened)),
})

export default connect(mapState, mapDispatch)(App)
