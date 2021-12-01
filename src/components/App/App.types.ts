import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  onConnect: () => void
  dummyBalance: string | null
  isFetchingDummyTokenBalance: boolean
}

export type MapStateProps = Pick<
  Props,
  | 'address'
  | 'isConnected'
  | 'isConnecting'
  | 'error'
  | 'dummyBalance'
  | 'isFetchingDummyTokenBalance'
>
export type MapDispatchProps = Pick<Props, 'onConnect'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
