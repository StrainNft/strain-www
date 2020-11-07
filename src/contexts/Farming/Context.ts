import { createContext } from 'react'

import { ContextValues } from './types'

const Context = createContext<ContextValues>({
  getPoolLPAddress: () => '',
  setConfirmTxModalIsOpen: () => {},
  onHarvest: () => {},
  onRedeem: () => {},
  onStake: () => {},
  onUnstake: () => {},
  getIncentivizerAddress: () => ''
})

export default Context