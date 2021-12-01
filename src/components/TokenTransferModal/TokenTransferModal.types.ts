import { AnyAction, Dispatch } from 'redux'
import { TransferTokenRequestAction } from '../../modules/transfer/actions'
import { Transfer } from '../../modules/transfer/types'

export type Props = {
  opened: boolean
  onClose: () => void
  onTransfer: (amount: string, address: string) => void
}

export type MapStateProps = Props
export type MapDispatchProps = Pick<Props, 'onTransfer'>
export type MapDispatch = Dispatch<TransferTokenRequestAction | AnyAction>
