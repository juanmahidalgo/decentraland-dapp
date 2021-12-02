import React, { useEffect } from 'react'
import { Button, Center, Footer, Modal, Navbar, Page } from 'decentraland-ui'
import { Props } from './App.types'
import { TokenTransferModal } from '../TokenTransferModal'
import { Route, Switch } from 'react-router'
import { Wallet } from '../Wallet'
import './App.css'
import { windowWithEthereum } from '../../modules/token/types'
import {
  ChainId,
  LOCALHOST_NETWORK_HEX,
  supportedChains,
} from '../../utils/networks'

const App: React.FC<Props> = ({
  onConnect,
  isConnecting,
  error,
  onAccountChange,
  onChainChange,
  chainId,
  getChainId,
}) => {
  useEffect(() => {
    getChainId()
    //@ts-ignore
    windowWithEthereum.ethereum.on('accountsChanged', onAccountChange)
    //@ts-ignore
    // unfortunately looks like MetaMask is not supporting the suggestion to change to Localhost :(
    windowWithEthereum.ethereum.on('chainChanged', (chainId: string) =>
      onChainChange(parseInt(chainId, 16))
    )
  }, [getChainId, onAccountChange, onChainChange])
  const isChainSupported =
    chainId && supportedChains.includes(chainId as unknown as ChainId)

  const handleChangeNetwork = async () => {
    try {
      //@ts-ignore
      await windowWithEthereum.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: LOCALHOST_NETWORK_HEX }],
      })
    } catch (switchError) {
      console.error('switchError: ', switchError)
    }
  }
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
      {!!chainId && !isChainSupported && (
        <Modal size="small" open={true}>
          <Modal.Header>Network not supported</Modal.Header>
          <Modal.Content>
            Please change your network to the localhost network
          </Modal.Content>
          <Modal.Actions>
            <Button primary onClick={handleChangeNetwork}>
              Take me there please!
            </Button>
          </Modal.Actions>
        </Modal>
      )}
    </>
  )
}

export default App
