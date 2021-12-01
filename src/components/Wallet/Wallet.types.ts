import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  tokenBalance: string | null
}

export type MapStateProps = Pick<Props, 'address' | 'tokenBalance'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
