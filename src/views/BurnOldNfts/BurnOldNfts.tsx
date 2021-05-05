import React from 'react'

import {
  Container,
  Spacer,
} from 'react-neu'

import styled from 'styled-components'
import Page from 'components/Page'
import StyledNotice from 'views/Common/StyledNotice'
import StyledNft from 'views/Common/StyledNft'
import useStrainNfts from 'hooks/useStrainNfts'
import blankStrainNFT from '../../assets/shadyStrainNFT.png'
import { DEFAULT_NFT_SIZE } from 'constants/poolValues'

const BurnOldNfts: React.FC = () => {

  const { oldStrainNftCollection } = useStrainNfts();

  return (
    <Page>
        <BurnOldNftsContainer>
          {oldStrainNftCollection.length <= 0 ?
                  <>
                  <img style={{paddingBottom: "30px"}} src={blankStrainNFT} alt="Blank Strain NFT" height={DEFAULT_NFT_SIZE} />
                  <StyledNotice
                    messages={["Connect a Wallet to burn Old Nft's"]}
                  />
                  </> : 
            oldStrainNftCollection
            .map((nft) => (
                  <StyledNft key={nft.nftId} nft={nft} isBurnOldNftsPage={true} />
            ))}
        </BurnOldNftsContainer>
    </Page>
  )
}

const BurnOldNftsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default BurnOldNfts;
