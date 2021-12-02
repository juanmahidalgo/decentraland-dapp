export enum ChainId {
  MAINNET = 1,
  ROPSTEN = 3,
  RINKEBY = 4,
  GOERLI = 5,
  KOVAN = 42,
  BSC = 56,
  BSCTEST = 97,
  HECO = 128,
  HECOTEST = 256,
  LOCAL = 1337,
}

export const supportedChains = [ChainId.LOCAL]

export const LOCALHOST_NETWORK_HEX = '0x539'
