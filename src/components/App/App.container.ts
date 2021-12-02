import { connect } from 'react-redux'
import {
  accountChanged,
  connectWalletRequest,
} from '../../modules/wallet/actions'
import { getError, isConnecting } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapDispatch, MapDispatchProps, MapStateProps } from './App.types'
import App from './App'

const mapState = (state: RootState): MapStateProps => ({
  isConnecting: isConnecting(state),
  error: getError(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onConnect: () => dispatch(connectWalletRequest()),
  onAccountChange: () => dispatch(accountChanged()),
})

export default connect(mapState, mapDispatch)(App)
