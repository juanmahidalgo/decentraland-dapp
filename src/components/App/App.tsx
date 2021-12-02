import React, { useEffect } from 'react'
import { Button, Center, Footer, Navbar, Page } from 'decentraland-ui'
import { Props } from './App.types'
import { TokenTransferModal } from '../TokenTransferModal'
import { Route, Switch } from 'react-router'
import { Wallet } from '../Wallet'
import { windowWithEthereum } from '../../modules/token/types'
import { NetworkModal } from '../NetworkModal'
import './App.css'

const App: React.FC<Props> = ({
  onConnect,
  isConnecting,
  error,
  onAccountChange,
}) => {
  useEffect(() => {
    //@ts-ignore
    windowWithEthereum.ethereum.on('accountsChanged', onAccountChange)
  }, [onAccountChange])
  return (
    <>
      <Navbar />
      <Page className="App">
        <Center>
          <Switch>
            {/* TODO: Abstract to its own component, maybe HomePage? */}
            <Route
              path="/"
              exact
              render={() => (
                <>
                  <Button primary onClick={onConnect} loading={isConnecting}>
                    Connect
                  </Button>
                  {error ? <p className="error">{error}</p> : null}
                </>
              )}
            />
            <Route path="/wallet" render={() => <Wallet />} />
            <Route path="/transfer" render={() => <TokenTransferModal />} />
          </Switch>
        </Center>
      </Page>
      <Footer />
      <NetworkModal />
    </>
  )
}

export default App
