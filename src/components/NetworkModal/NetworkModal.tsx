import React, { useEffect } from 'react'
import { Button, Modal } from 'decentraland-ui'
import {
  ChainId,
  LOCALHOST_NETWORK_HEX,
  supportedChains,
} from '../../utils/networks'
import { Props } from './NetworkModal.types'
import { windowWithEthereum } from '../../modules/token/types'

const NetworkModal: React.FC<Props> = ({
  chainId,
  getChainId,
  onChainChange,
}) => {
  useEffect(() => {
    getChainId()
    //@ts-ignore
    // unfortunately looks like MetaMask is not supporting the suggestion to change to Localhost :(
    windowWithEthereum.ethereum.on('chainChanged', (chainId: string) =>
      onChainChange(parseInt(chainId, 16))
    )
  }, [getChainId, onChainChange])

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
  const isChainSupported =
    chainId && supportedChains.includes(chainId as unknown as ChainId)
  const showShowModal = !!chainId && !isChainSupported
  return (
    <Modal size="small" open={showShowModal}>
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
  )
}

export default NetworkModal
