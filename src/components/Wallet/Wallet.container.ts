import { connect } from 'react-redux'
import { getAddress } from '../../modules/wallet/selectors'
import { RootState } from '../../modules/types'
import { MapStateProps } from './Wallet.types'
import Wallet from './Wallet'
import { getDummyBalance } from '../../modules/token/selectors'

const mapState = (state: RootState): MapStateProps => ({
  address: getAddress(state),
  dummyBalance: getDummyBalance(state),
})

export default connect(mapState)(Wallet)
