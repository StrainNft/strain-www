import React, { useEffect, useMemo, useState } from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import Page from 'components/Page'
import PageHeader from 'components/PageHeader'
import Split from 'components/Split'

import SingleHarvestCard from './SingleHarvest'
import SingleStakeCard from './SingleStake'
import SingleRedeemButton from './SingleRedeem'

const Stake: React.FC = () => {

  return (
    <Page>
      <Container>
        <PageHeader
          imgSrc=""
          subtitle="Stake STRN tokens to earn STXP"
          title=""
        />
        <Split>
          <SingleStakeCard />
          <SingleHarvestCard />
        </Split>
        <Spacer size="lg" />
        <SingleRedeemButton />
        <Spacer />
        <Spacer size="lg" />

      </Container>
    </Page>
  )
}

export default Stake
