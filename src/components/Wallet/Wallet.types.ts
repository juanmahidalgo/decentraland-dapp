import { AnyAction, Dispatch } from 'redux'
import { ConnectWalletRequestAction } from '../../modules/wallet/actions'

export type Props = {
  address: string
  dummyBalance: string | null
}

export type MapStateProps = Pick<Props, 'address' | 'dummyBalance'>
export type MapDispatch = Dispatch<ConnectWalletRequestAction | AnyAction>
