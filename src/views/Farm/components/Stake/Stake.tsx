import React, { useCallback, useMemo, useState } from 'react'

import numeral from 'numeral'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'

import useFarming from 'hooks/useFarming'

import { bnToDec, getItemValue } from 'utils'
import StakeModal from './components/StakeModal'
import UnstakeModal from './components/UnstakeModal'
import styled from 'styled-components'
import useApproval from 'hooks/useApproval'

const Stake: React.FC<{ poolId: string, lpEmoji?: string, lpLabel: string, lpImage?: string }> = ({ poolId, lpEmoji, lpImage, lpLabel }) => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)
  const { status } = useWallet()
  const {
    getPoolLPAddress,
    setConfirmTxModalIsOpen,
    isStaking,
    isUnstaking,
    onStake,
    onUnstake,
    stakedBalance,
    strnEthPoolAddress,
    onRedeem
  } = useFarming()


  const { isApproved, isApproving, onApprove } = useApproval(
    getPoolLPAddress(poolId),
    strnEthPoolAddress,
    () => setConfirmTxModalIsOpen(false)
  )

  const handleApprove = useCallback(() => {
    setConfirmTxModalIsOpen(true)
    onApprove()
  }, [
    onApprove,
    setConfirmTxModalIsOpen,
  ])
  

  const handleDismissStakeModal = useCallback(() => {
    setStakeModalIsOpen(false)
  }, [setStakeModalIsOpen])

  const handleDismissUnstakeModal = useCallback(() => {
    setUnstakeModalIsOpen(false)
  }, [setUnstakeModalIsOpen])

  const handleOnStake = useCallback((amount: string) => {
    onStake(poolId, amount)
    handleDismissStakeModal()
  }, [handleDismissStakeModal, onStake])

  const handleOnUnstake = useCallback((amount: string) => {
    onUnstake(poolId, amount)
    handleDismissUnstakeModal()
  }, [
    handleDismissUnstakeModal,
    onUnstake,
  ])

  const handleOnExit = useCallback(() => {
    onRedeem(poolId)
    handleDismissUnstakeModal()
  }, [
    handleDismissUnstakeModal,
    onRedeem,
  ])

  const handleStakeClick = useCallback(() => {
    setStakeModalIsOpen(true)
  }, [setStakeModalIsOpen])

  const handleUnstakeClick = useCallback(() => {
    setUnstakeModalIsOpen(true)
  }, [setUnstakeModalIsOpen])

  const StakeButton = useMemo(() => {
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Stake"
          variant="secondary"
        />
      )
    }
    if (getItemValue(isStaking, poolId)) {
      return (
        <Button
          disabled
          full
          text="Staking..."
          variant="secondary"
        />
      )
    }
    if (!isApproved) {
      return (
        <Button
          disabled={isApproving}
          full
          onClick={handleApprove}
          text={!isApproving ? "Approve staking" : "Approving staking..."}
          variant={isApproving || status !== 'connected' ? 'secondary' : 'default'}
        />
      )
    }

    if (isApproved) {
      return (
        <Button
          full
          onClick={handleStakeClick}
          text="Stake"
        />
      )
    }
  }, [
    handleStakeClick,
    isApproving,
    handleApprove,
    status,
  ])

  const ExitButton = useMemo(() => {
    const hasStaked = stakedBalance && stakedBalance.toNumber() > 0
    if (status !== 'connected' || !hasStaked) {
      return (
        <Button
          disabled
          full
          text="Exit"
          variant="secondary"
        />
      )
    }
    if (getItemValue(isUnstaking, poolId)) {
      return (
        <Button
          disabled
          full
          text="Exit..."
          variant="secondary"
        />
      )
    }
    return (
      <Button
        full
        onClick={() => onRedeem(poolId)}
        text="Exit"
        variant="secondary"
      />
    )
  }, [
    handleUnstakeClick,
    isApproving,
    handleApprove,
    status,
  ])

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance) {
      return numeral(bnToDec(stakedBalance)).format('0.00a')
    } else {
      return '--'
    }
  }, [stakedBalance])

  const StyledImage = styled.img`
    display: block;
    width: '50px';
`;

  return (
    <>
      <Card>
        <CardIcon>{lpEmoji ? lpEmoji : <StyledImage src={require(`../../../../assets/${lpImage}`)} />}</CardIcon>
        <CardContent>
          <Box
            alignItems="center"
            column
          >
            {/*<Value value={formattedStakedBalance} />*/}
            <Label text={`Staked LP ${lpLabel} Tokens`} />
          </Box>
        </CardContent>
        <CardActions>
          {ExitButton}
          {StakeButton}
        </CardActions>
      </Card>
      <StakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
        lpLabel={lpLabel}
      />
    </>
  )
}

export default Stake