import React, { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import ConfirmTransactionModal from 'components/ConfirmTransactionModal'
import { strnEthLP as strnEthLPAddress } from 'constants/tokenAddresses'
import useApproval from 'hooks/useApproval'
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

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isStaking, setIsStaking] = useState(false)
  const [isUnstaking, setIsUnstaking] = useState(false)

  const [earnedBalance, setEarnedBalance] = useState<BigNumber>()
  const [stakedBalance, setStakedBalance] = useState<BigNumber>()

  const yam = useYam()
  const { account } = useWallet()
  
  const strnEthPoolAddress = yam ? yam.contracts.strneth_pool.options.address : ''
  const { isApproved, isApproving, onApprove } = useApproval(
    strnEthLPAddress,
    strnEthPoolAddress,
    () => setConfirmTxModalIsOpen(false)
  )

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

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [
    onApprove,
    setConfirmTxModalIsOpen,
  ])

  const handleHarvest = useCallback(async () => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await harvest(yam, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsHarvesting(true)
    })
    setIsHarvesting(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsHarvesting,
    yam
  ])

  const handleRedeem = useCallback(async (poolId) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await redeem(yam, poolId, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsRedeeming(true)
    })
    setIsRedeeming(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsRedeeming,
    yam
  ])

  const handleStake = useCallback(async (poolId: string, amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await stake(yam, poolId, amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsStaking(true)
    })
    setIsStaking(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsStaking,
    yam
  ])

  const handleUnstake = useCallback(async (poolId: string, amount: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    await unstake(yam, poolId, amount, account, () => {
      setConfirmTxModalIsOpen(false)
      setIsUnstaking(true)
    })
    setIsUnstaking(false)
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
      earnedBalance,
      isApproved,
      isApproving,
      isHarvesting,
      isRedeeming,
      isStaking,
      isUnstaking,
      onApprove: handleApprove,
      onHarvest: handleHarvest,
      onRedeem: handleRedeem,
      onStake: handleStake,
      onUnstake: handleUnstake,
      stakedBalance,
    }}>
      {children}
      <ConfirmTransactionModal isOpen={confirmTxModalIsOpen} />
    </Context.Provider>
  )
}

export default Provider