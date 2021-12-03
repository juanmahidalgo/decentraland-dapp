export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  LOCAL = 1337,
}

export const supportedChain: ChainId = process.env.REACT_APP_ENABLED_NETWORK
  ? parseInt(process.env.REACT_APP_ENABLED_NETWORK, 10)
  : ChainId.LOCAL

export const NETWORK_ID_HEX_MAP = {
  [ChainId.MAINNET]: '0x1',
  [ChainId.ROPSTEN]: '0x3',
  [ChainId.RINKEBY]: '0x4',
  [ChainId.GOERLI]: '0x5',
  [ChainId.LOCAL]: '0x539',
}

export const NETWORK_ID_ETHERSCAN_MAP = {
  [ChainId.MAINNET]: '',
  [ChainId.ROPSTEN]: 'ropsten',
  [ChainId.RINKEBY]: 'rinkeby',
  [ChainId.GOERLI]: 'goerli',
  [ChainId.LOCAL]: 'localhost',
}

export const supportedChainName = NETWORK_ID_ETHERSCAN_MAP[supportedChain]
