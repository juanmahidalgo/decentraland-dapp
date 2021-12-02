import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  onConnect: () => void
  onAccountChange: () => void
  onChainChange: (chainId: number) => void
  isConnecting: boolean
  error: string | null
  chainId: number | null
  getChainId: () => void
}

export type MapStateProps = Pick<Props, 'isConnecting' | 'error' | 'chainId'>
export type MapDispatchProps = Pick<
  Props,
  'onConnect' | 'onAccountChange' | 'onChainChange' | 'getChainId'
>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
