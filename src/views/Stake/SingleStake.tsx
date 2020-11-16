import React, { useCallback, useMemo, useState } from 'react'

import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardIcon,
  Container,
  Spacer,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import Label from 'components/Label'
import Value from 'components/Value'
import numeral from 'numeral'
import DurationStakeModal from 'views/Modals/DurationStakeModal'
import UnstakeModal from 'views/Modals/UnstakeModal'
import styled from 'styled-components'
import useApproval from 'hooks/useApproval'
import useBalances from 'hooks/useBalances'
import SplitRow from 'components/SplitRow'
import { StyledSubtitle } from 'components/PageHeader/PageHeader'
import { PoolIds } from 'constants/poolValues'
import useStaking from 'hooks/useStaking'
import BigNumber from 'bignumber.js'

const SingleStake: React.FC = () => {
  const [stakeModalIsOpen, setStakeModalIsOpen] = useState(false)
  const [unstakeModalIsOpen, setUnstakeModalIsOpen] = useState(false)

  const { status } = useWallet()
  const {
    strnTokenAddress,
    setConfirmTxModalIsOpen,
    isStaking,
    isUnstaking,
    onStake,
    onUnstake,
    getIncentivizerAddress,
    totalStaked,
    endTime
  } = useStaking()

  const {
    strnTokenBalance,
     } = useBalances()


  const { isApproved, isApproving, onApprove } = useApproval(
    strnTokenAddress,
    getIncentivizerAddress(),
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
    // TODO: add date picker
    const duration = "0"
    onStake(duration, amount)
    handleDismissStakeModal()
  }, [handleDismissStakeModal, onStake])

  const handleOnUnstake = useCallback((amount: string) => {
    onUnstake(amount)
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
    isStaking,
    handleApprove,
    status,
  ])

  const UnstakeButton = useMemo(() => {
    if (status !== 'connected' || (totalStaked && totalStaked?.gt(0))) {
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
    isUnstaking,
    handleApprove,
    status,
  ])

  const formattedStakedBalance = useMemo(() => {
    if (totalStaked) {
      return totalStaked.gt(0) ? totalStaked.toFixed(2) : "0.00"
    } else {
      return '--'
    }
  }, [totalStaked])

  const formattedWalletBalance = useMemo(() => {
    if (strnTokenBalance) {
      return strnTokenBalance.gt(0) ? strnTokenBalance.toFixed(2) : "0.00"
    } else {
      return '--'
    }
  }, [strnTokenBalance])

  const getDisplayBalance = useCallback((value?: BigNumber) => {
    if (value) {
      return numeral(value).format('0.00a')
    } else {
      return '--'
    }
  }, [])
  
  return (
    <>
      <Card>
        <Container size="sm">
          <Spacer />
          <StyledSubtitle>Stake STRN</StyledSubtitle>
        </Container>
        <CardIcon>🧬</CardIcon>
        <CardContent>
          <Box
            alignItems="center"
            row
          >
            <SplitRow>
              <>
                <Value value={getDisplayBalance(totalStaked)} />
                <Label text={`Staked`} />
              </>
              <>
                <Value value={getDisplayBalance(strnTokenBalance)} />
                <Label text={`Wallet`} />
              </>
            </SplitRow>
          </Box>
        </CardContent>
        <CardActions>
          {UnstakeButton}
          {StakeButton}
        </CardActions>
      </Card>
      <DurationStakeModal
        isOpen={stakeModalIsOpen}
        onDismiss={handleDismissStakeModal}
        onStake={handleOnStake}
        label={'STRN'}
        fullBalance={strnTokenBalance}
        maxTimestamp={endTime}
      />
      <UnstakeModal
        isOpen={unstakeModalIsOpen}
        onDismiss={handleDismissUnstakeModal}
        onUnstake={handleOnUnstake}
        lpLabel={'STRN'}
        poolId={PoolIds.STRN_SINGLE}
      />
    </>
  )
}

export default SingleStake
