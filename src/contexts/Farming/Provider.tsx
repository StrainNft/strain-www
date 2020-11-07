import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'
import {
  strnEthLP as strnEthLPAddress,
  strnIncentivizer,
  strnXiotLP as strnXiotLPAddress,
  strnXiotIncentivizer
} from 'constants/tokenAddresses'
import useYam from 'hooks/useYam'

import {
  getEarned,
  getStaked,
  harvest,
  redeem,
  stake,
  unstake,
} from 'yam-sdk/utils'

import Context from './Context'
import { setItemValue } from 'utils'

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState([false, false])
  const [isRedeeming, setIsRedeeming] = useState([false, false])
  const [isStaking, setIsStaking] = useState([false, false])
  const [isUnstaking, setIsUnstaking] = useState([false, false])

  const [earnedBalance, setEarnedBalance] = useState<BigNumber>()
  const [stakedBalance, setStakedBalance] = useState<BigNumber>()

  const yam = useYam()
  const { account } = useWallet()
  
  const lpAddresses = [strnEthLPAddress, strnXiotLPAddress]
  const getPoolLPAddress = (poolId: string) => {
    return lpAddresses[Number(poolId)]
  }
  
  const incentivizerAddresses = [strnIncentivizer, strnXiotIncentivizer]
  const getIncentivizerAddress = (poolId: string) => {
    return incentivizerAddresses[Number(poolId)]
  }

  const getIncContract = (poolId: string) => {
    if (yam) {
      if (poolId === "0") {
        return yam.contracts.strneth_pool
      }
      return yam.contracts.strnxiot_pool
    }
  }

  const fetchEarnedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getEarned(yam, yam.contracts.strneth_pool, account)
    setEarnedBalance(balance)
  }, [
    account,
    setEarnedBalance,
    yam
  ])

  const fetchStakedBalance = useCallback(async () => {
    if (!account || !yam) return
    const balance = await getStaked(yam, yam.contracts.strneth_pool, account)
    setStakedBalance(balance)
  }, [
    account,
    setStakedBalance,
    yam
  ])

  const fetchBalances = useCallback(async () => {
    fetchEarnedBalance()
    fetchStakedBalance()
  }, [
    fetchEarnedBalance,
    fetchStakedBalance,
  ])

  const handleHarvest = useCallback(async (poolId) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await harvest(getIncContract(poolId), yam.web3.eth, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsHarvesting(setItemValue(isHarvesting, poolId, true))
    })
    setIsHarvesting(setItemValue(isHarvesting, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    yam
  ])

  const handleRedeem = useCallback(async (poolId) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await redeem(getIncContract(poolId), yam.web3.eth, "0", account, () => {
      setConfirmTxModalIsOpen(false)
      setIsRedeeming(setItemValue(isRedeeming, poolId, true))
    })
    setIsRedeeming(setItemValue(isRedeeming, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsRedeeming,
    yam
  ])

  const handleStake = useCallback(async (poolId: string, amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await stake(getIncContract(poolId), yam.web3.eth, "0", amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsStaking(setItemValue(isStaking, poolId, true))
    })
    setIsStaking(setItemValue(isStaking, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsStaking,
    yam
  ])

  const handleUnstake = useCallback(async (poolId: string, amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await unstake(getIncContract(poolId), yam.web3.eth, "0", amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsUnstaking(setItemValue(isUnstaking, poolId, true))
    })
    setIsUnstaking(setItemValue(isUnstaking, poolId, false))
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsUnstaking,
    yam
  ])

  useEffect(() => {
    fetchBalances()
    let refreshInterval = setInterval(() => fetchBalances(), 10000)
    return () => clearInterval(refreshInterval)
  }, [fetchBalances])

  return (
    <Context.Provider value={{
      getPoolLPAddress,
      setConfirmTxModalIsOpen,
      earnedBalance,
      isHarvesting,
      isRedeeming,
      isStaking,
      isUnstaking,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
      onStake: handleStake,
      onUnstake: handleUnstake,
      stakedBalance,
      getIncentivizerAddress,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider