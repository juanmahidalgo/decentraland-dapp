import React, { useState } from 'react'
import {
  Button,
  Card,
  Center,
  Field,
  Footer,
  Header,
  Loader,
  Modal,
  Navbar,
  Page,
} from 'decentraland-ui'
import { Props } from './App.types'
import './App.css'
import TokenTransferModal from '../TokenTransferModal/TokenTransferModal'

const App: React.FC<Props> = ({
  address,
  isConnected,
  onConnect,
  isConnecting,
  error,
  dummyBalance,
  isFetchingDummyTokenBalance,
}) => {
  console.log('dummyBalance: ', dummyBalance)
  console.log('isFetchingDummyTokenBalance: ', isFetchingDummyTokenBalance)
  const [showTransferModal, setShowTransferModal] = useState(false)

  return (
    <>
      <Navbar />
      <Page className="App">
        <Center>
          {!isConnected ? (
            <>
              <Button primary onClick={onConnect} loading={isConnecting}>
                Connect
              </Button>
              {error ? <p className="error">{error}</p> : null}
            </>
          ) : (
            <Card>
              <Header>Wallet</Header>
              <p>
                <strong>Address:</strong>&nbsp;
                {address.slice(0, 6) + '...' + address.slice(-4)}
              </p>
              <div className="balance-container">
                <span>
                  <strong>Balance:</strong>&nbsp;
                  {isFetchingDummyTokenBalance ? (
                    <Loader active size="mini" />
                  ) : (
                    dummyBalance
                  )}
                </span>
                <Button basic onClick={() => setShowTransferModal(true)}>
                  Transfer
                </Button>
              </div>
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
      <TokenTransferModal
        opened={showTransferModal}
        onClose={() => setShowTransferModal(false)}
      />
    </>
  )
}

export default App
