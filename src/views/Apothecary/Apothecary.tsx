import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import strain from '../../assets/randomStrainNFT.png'

const StyledNotice = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  width: 100%
  color: ${props => props.theme.colors.primary.main};
`



const Stake: React.FC = () => {


  return (
    <Page>
      <Container>
        <StyledNotice>
          <h1>Apothecary</h1>
          <NFTCard> 
            <h3>Alien Cookies</h3>
            <h4>Indica</h4>
            <img src={strain} height={120}/>
            <RarityButton>earthy</RarityButton>
            </NFTCard>
        </StyledNotice>
        <Spacer size="md" />
        <StyledNotice>
          </StyledNotice>
      </Container>
    </Page>
  )
}

const NFTCard = styled.div`
width: 200px; 
height: 250px;
background-color: #0E2B52;
border-radius: 20px;
color: white;
text-align: center;
display: inline-block !important;
margin: 0 20px;
`
const RarityButton = styled.button`
width: 100px;
height: 26px;
background-color: #7AF7B6;
border: 0;
border-radius: 6px;
font-family: Gopher;
`

export default Stake
