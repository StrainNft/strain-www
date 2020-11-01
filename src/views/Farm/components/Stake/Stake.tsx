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

import { bnToDec } from 'utils'

import StakeModal from './components/StakeModal'
import UnstakeModal from './components/UnstakeModal'
import styled from 'styled-components'

const Stake: React.FC<{ poolId: string, lpEmoji?: string, lpLabel: string, lpImage?: string }> = ({ poolId, lpEmoji, lpImage, lpLabel }) => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)
  const { status } = useWallet()
  const {
    isApproved,
    isApproving,
    isStaking,
    isUnstaking,
    onApprove,
    onStake,
    onUnstake,
    stakedBalance,
  } = useFarming()

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
    if (isStaking) {
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
          onClick={onApprove}
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
    onApprove,
    status,
  ])

  const UnstakeButton = useMemo(() => {
    const hasStaked = stakedBalance && stakedBalance.toNumber() > 0
    if (status !== 'connected' || !hasStaked) {
      return (
        <Button
          disabled
          full
          text="Unstake"
          variant="secondary"
        />
      )
    }
    if (isUnstaking) {
      return (
        <Button
          disabled
          full
          text="Unstaking..."
          variant="secondary"
        />
      )
    }
    return (
      <Button
        full
        onClick={handleUnstakeClick}
        text="Unstake"
        variant="secondary"
      />
    )
  }, [
    handleUnstakeClick,
    isApproving,
    onApprove,
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
            <Value value={formattedStakedBalance} />
            <Label text={`Staked LP ${lpLabel} Tokens`} />
          </Box>
        </CardContent>
        <CardActions>
          {UnstakeButton}
          {StakeButton}
        </CardActions>
      </Card>
      <StakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
      />
      <UnstakeModal
        isOpen={unstakeModalIsOpen}
        onDismiss={handleDismissUnstakeModal}
        onUnstake={handleOnUnstake}
      />
    </>
  )
}

export default Stake