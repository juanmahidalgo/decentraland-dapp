import { connect } from 'react-redux'
import {
  accountChanged,
  connectWalletRequest,
} from '../../modules/wallet/actions'
import { getError, isConnecting } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types'
import App from './App'
import { getChainId } from '../../modules/network/selectors'
import { chainChanged, getChain } from '../../modules/network/actions'

const mapState = (state: RootState): MapStateProps => ({
  isConnecting: isConnecting(state),
  error: getError(state),
  chainId: getChainId(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onAccountChange: () => dispatch(accountChanged()),
  onChainChange: (chainId: number) => dispatch(chainChanged(chainId)),
  getChainId: () => dispatch(getChain()),
})

export default connect(mapState, mapDispatch)(App)
