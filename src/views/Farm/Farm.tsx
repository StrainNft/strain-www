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
import useFarming from 'hooks/useFarming'
import { bnToDec } from 'utils'
import numeral from 'numeral'
import FancyValue from 'components/FancyValue'
import styled from 'styled-components'

const Farm: React.FC = () => {

  const {
    stakedBalance,
  } = useFarming()

  const formattedStakedBalance = useMemo(() => {
    if (stakedBalance) {
      return numeral(bnToDec(stakedBalance)).format('0.00a')
    } else {
      return '--'
    }
  }, [stakedBalance])

  const StyledRow = styled.div`
    display: flex;
    justify-content: center;
  `

  return (
    <Page>
      <Container>
        <Container>
          <StyledRow>
            <Box column>
              <FancyValue
                icon={<span role="img" style={{ opacity: 0.5 }} >LP</span>}
                label="total staked UNI-V2 token balance"
                value={formattedStakedBalance}
              />
            </Box>
          </StyledRow>
        </Container>
        <Spacer />
        <Split>
          <StakeCard poolId={"0"} lpEmoji={'🔒'} lpLabel={'STRN/ETH'} />
          <StakeCard poolId={"1"} lpImage={'strain-xiotri-sm.png'} lpLabel={'STRN/XIOT'} />
        </Split>
        <Spacer />
        <Spacer size="sm" />
        <Separator />
      </Container>
      <Container>
        <Spacer size="sm" />
        <PageHeader
          imgSrc=""
          subtitle="Total earned STRN"
          title=""
        />
        <Split>
          <HarvestCard poolId={"1"} />
        </Split>
        <Spacer />
        <Separator />
      </Container>
    </Page>
  )
}

export default Farm
