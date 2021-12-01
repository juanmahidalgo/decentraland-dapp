import { connect } from 'react-redux'
import { RootState } from '../../modules/types'
import {
  MapDispatch,
  MapDispatchProps,
  MapStateProps,
} from './TokenTransferModal.types'
import TokenTransferModal from './TokenTransferModal'
import { transferTokenRequest } from '../../modules/transfer/actions'

// const mapState = (state: RootState): MapStateProps => ({
//   // getPendingTransactions: getPendingTransactions(state),
//   activeTransfer: getActiveTransfer(state),
// })

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (amount: string, address: string) =>
    dispatch(transferTokenRequest(address, amount)),
})

// export default connect(mapState, mapDispatch)(TokenTransferModal)
export default connect(null, mapDispatch)(TokenTransferModal)
