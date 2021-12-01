import { AnyAction, Dispatch } from 'redux'
import { Transfer } from '../../modules/transfer/types'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  onConnect: () => void
  onOpenTransferModal: (opened: boolean) => void
  dummyBalance: string | null
  isFetchingDummyTokenBalance: boolean
  pendingTransactions: Transfer[]
  isTransferModalOpened: boolean
}

export type MapStateProps = Pick<
  Props,
  | 'address'
  | 'isConnected'
  | 'isConnecting'
  | 'error'
  | 'dummyBalance'
  | 'isFetchingDummyTokenBalance'
  | 'pendingTransactions'
  | 'isTransferModalOpened'
>
export type MapDispatchProps = Pick<Props, 'onConnect' | 'onOpenTransferModal'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
