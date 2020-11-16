import React, { useMemo } from 'react'

import numeral from 'numeral'
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

import useFarming from 'hooks/useFarming'

import { bnToDec, getItemValue } from 'utils'
import { StyledSubtitle } from 'components/PageHeader/PageHeader'
import BigNumber from 'bignumber.js'
import { PoolIds } from 'constants/poolValues'

const Harvest: React.FC = () => {
  const {
    getEarnedBalances,
    isHarvesting,
    isRedeeming,
    onHarvest,
  } = useFarming()

  const { status } = useWallet()

  const HarvestAction = useMemo(() => {
    const isClaiming = getItemValue(isHarvesting, PoolIds.STRN_SINGLE) || getItemValue(isRedeeming, PoolIds.STRN_SINGLE);
    if (status !== 'connected') {
      return (
        <Button
          disabled
          full
          text="Claim"
          variant="secondary"
        />
      )
    }
    if (!isClaiming) {
      return (
        <Button
          full
          onClick={() => onHarvest(PoolIds.STRN_SINGLE)}
          text="Claim"
        />
      )
    }
    if (isClaiming) {
      return (
        <Button
          disabled
          full
          text="Claiming..."
          variant="secondary"
        />
      )
    }
  }, [
    String(isHarvesting),
    String(isRedeeming),
    onHarvest,
    status
  ])

  const formattedEarnedBalance = useMemo(() => {
    const balance = getEarnedBalances(PoolIds.STRN_SINGLE)
    if (balance) {
      return numeral(bnToDec(balance)).format('0.00a')
    } else {
      return '--'
    }
  }, [getEarnedBalances])

  return (
    <Card>
      <Container size="sm">
        <Spacer />
        <StyledSubtitle>Earned STXP</StyledSubtitle>
      </Container>
      <CardIcon>🍯</CardIcon>
      <CardContent>
        <Box
          alignItems="center"
          column
        >
          <Value value={formattedEarnedBalance} />
          <Label text="Claimable STXPs" />
        </Box>
      </CardContent>
      <CardActions>
        {HarvestAction}
      </CardActions>
    </Card>
  )
}

export default Harvest