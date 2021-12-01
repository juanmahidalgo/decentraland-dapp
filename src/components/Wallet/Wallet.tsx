import React from 'react'
import { Button, Card, Header } from 'decentraland-ui'
import { Props } from './Wallet.types'
import { Link } from 'react-router-dom'

const Wallet: React.FC<Props> = ({ address, tokenBalance }) => {
  return (
    <Card>
      <Header>Wallet</Header>
      <p>
        <strong>Address:</strong>&nbsp;
        {address.slice(0, 6) + '...' + address.slice(-4)}
      </p>
      <div className="balance-container">
        <span>
          <strong>Balance:</strong> {tokenBalance}
        </span>
        <Link to="/transfer">
          <Button basic>Transfer</Button>
        </Link>
      </div>
    </Card>
  )
}

export default Wallet
