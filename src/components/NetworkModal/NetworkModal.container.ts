import { connect } from 'react-redux'
import { RootState } from '../../modules/types'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './NetworkModal.types'
import NetworkModal from './NetworkModal'
import { getChainId } from '../../modules/network/selectors'
import { chainChanged, getChain } from '../../modules/network/actions'

const mapState = (state: RootState): MapStateProps => ({
  chainId: getChainId(state),
})

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onChainChange: (chainId: number) => dispatch(chainChanged(chainId)),
  getChainId: () => dispatch(getChain()),
})

export default connect(mapState, mapDispatch)(NetworkModal)
