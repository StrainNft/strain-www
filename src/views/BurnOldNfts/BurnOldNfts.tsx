import React, { useMemo } from "react";

import { Container, Spacer } from "react-neu";

import styled from "styled-components";
import Page from "components/Page";
import StyledNotice from "views/Common/StyledNotice";
import StyledOldNft from "./StyledOldNft
import useStrainNfts from "hooks/useStrainNfts";
import blankStrainNFT from "../../assets/shadyStrainNFT.png";
import { DEFAULT_NFT_SIZE } from "constants/poolValues";
import { useWallet } from "use-wallet";

const BurnOldNfts: React.FC = () => {
  const { oldStrainNftCollection } = useStrainNfts();

  const { status } = useWallet();

  const BurnOldNftsNotice = useMemo(() => {
    if (status !== "connected") {
      return (
        <>
          <StyledNotice messages={["Connect a Wallet to burn Old Nft's"]} />
        </>
      );
    }
    if (status === "connected") {
      return (
        <>
          <StyledNotice messages={["You Don't Have Old Nft's"]} />
        </>
      );
    }
  }, [status]);

  return (
    <Page>
      <BurnOldNftsContainer>
        {oldStrainNftCollection.length <= 0 ? (
          <>
            <img
              style={{ paddingBottom: "30px" }}
              src={blankStrainNFT}
              alt="Blank Strain NFT"
              height={DEFAULT_NFT_SIZE}
            />
            {BurnOldNftsNotice}
          </>
        ) : (
          oldStrainNftCollection.map((nft) => (
            <StyledOldNft key={nft.nftId} nft={nft}/>
          ))
        )}
      </BurnOldNftsContainer>
    </Page>
  );
};

const BurnOldNftsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export default BurnOldNfts;
