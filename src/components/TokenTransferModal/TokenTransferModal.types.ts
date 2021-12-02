import { AnyAction, Dispatch } from 'redux'
import { TransferTokenRequestAction } from '../../modules/transfer/actions'

export type Props = {
  onClose: () => void
  onTransfer: (amount: string, address: string) => void
  tokenBalance: string | null
  isTranferButtonLoading: boolean
}

export type MapStateProps = Pick<
  Props,
  'isTranferButtonLoading' | 'tokenBalance'
>
export type MapDispatchProps = Pick<Props, 'onTransfer' | 'onClose'>
export type MapDispatch = Dispatch<TransferTokenRequestAction | AnyAction>
