import React, { useMemo } from 'react'

import {
  Box,
  Button,
  Container,
  Separator,
  Spacer,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import HarvestCard from './components/Harvest'
import StakeCard from './components/Stake'
import RedeemButton from './components/Stake/Redeem'

const Farm: React.FC = () => {
  return (
    <Page>
      <Container>
        <PageHeader
          imgSrc=""
          subtitle="Stake STRN/ETH LP tokens to earn STRN"
          title=""
        />
        <Split>
          <StakeCard poolId={"0"} lpEmoji={'🔒'} lpLabel={'STRN/ETH'} />
          <HarvestCard poolId={"0"} />
        </Split>
        <Spacer size="lg" />
        <RedeemButton poolId={"0"} />
        <Spacer />
        <Spacer size="lg" />

      </Container>
      <Container>
        <Spacer size="lg" />
        <PageHeader
          imgSrc=""
          subtitle="Stake STRN/XIOT LP tokens to earn STRN"
          title=""
        />
        <Split>
          <StakeCard poolId={"1"} lpImage={'strain-xiotri-sm.png'} lpLabel={'STRN/XIOT'} />
          <HarvestCard poolId={"1"} />
        </Split>
        <Spacer size="lg" />
        <RedeemButton poolId={"1"} />
        <Separator />
      </Container>
    </Page>
  )
}

export default Farm
