import { connect } from 'react-redux'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './TokenTransferModal.types'
import TokenTransferModal from './TokenTransferModal'
import { transferTokenRequest } from '../../modules/transfer/actions'
import { getIsTransferButtonLoading } from '../../modules/transfer/selectors'
import { RootState } from '../../modules/types'
import { push } from 'connected-react-router'

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (amount: string, address: string) =>
    dispatch(transferTokenRequest(address, amount)),
  onClose: () => dispatch(push('/wallet')),
})

const mapState = (state: RootState): MapStateProps => ({
  isTranferButtonLoading: getIsTransferButtonLoading(state),
})

export default connect(mapState, mapDispatch)(TokenTransferModal)
