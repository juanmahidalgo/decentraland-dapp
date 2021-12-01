import { connect } from 'react-redux'
import { MapDispatch, MapDispatchProps } from './TokenTransferModal.types'
import TokenTransferModal from './TokenTransferModal'
import { transferTokenRequest } from '../../modules/transfer/actions'

const mapDispatch = (dispatch: MapDispatch): MapDispatchProps => ({
  onTransfer: (amount: string, address: string) =>
    dispatch(transferTokenRequest(address, amount)),
})

export default connect(null, mapDispatch)(TokenTransferModal)
