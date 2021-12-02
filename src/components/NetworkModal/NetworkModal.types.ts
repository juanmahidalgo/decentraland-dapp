import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  onChainChange: (chainId: number) => void
  chainId: number | null
  getChainId: () => void
}

export type MapStateProps = Pick<Props, 'chainId'>
export type MapDispatchProps = Pick<Props, 'onChainChange' | 'getChainId'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
