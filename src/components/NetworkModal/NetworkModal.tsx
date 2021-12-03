import React, { useEffect } from 'react'
import { Button, Modal } from 'decentraland-ui'
import { NETWORK_ID_HEX_MAP, supportedChain } from '../../utils/networks'
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
        params: [{ chainId: NETWORK_ID_HEX_MAP[supportedChain] }],
      })
    } catch (switchError) {
      console.error('switchError: ', switchError)
    }
  }
  const isChainSupported = chainId && supportedChain === chainId
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
