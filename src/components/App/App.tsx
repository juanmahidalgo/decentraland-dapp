import React from 'react'
import ToastProvider from 'decentraland-dapps/dist/providers/ToastProvider'
import {
  Button,
  Card,
  Center,
  Footer,
  Header,
  Loader,
  Navbar,
  Page,
} from 'decentraland-ui'
import { Props } from './App.types'
import './App.css'
import { TokenTransferModal } from '../TokenTransferModal'

const App: React.FC<Props> = ({
  address,
  isConnected,
  onConnect,
  isConnecting,
  error,
  dummyBalance,
  isFetchingDummyTokenBalance,
  pendingTransactions,
  isTransferModalOpened,
  onOpenTransferModal,
}) => {
  return (
    <ToastProvider position="bottom right">
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
                <Button basic onClick={() => onOpenTransferModal(true)}>
                  Transfer
                </Button>
              </div>
            </Card>
          )}
        </Center>
      </Page>
      <Footer />
      <TokenTransferModal
        opened={isTransferModalOpened}
        onClose={() => onOpenTransferModal(false)}
      />
    </ToastProvider>
  )
}

export default App
