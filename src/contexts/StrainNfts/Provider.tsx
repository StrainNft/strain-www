import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'

import {
  getAddresses,
} from 'constants/tokenAddresses'

import Context from './Context'
import { NftInstance } from 'constants/poolValues'
import useYam from 'hooks/useYam'
import { burnNft, generateNft } from 'yam-sdk/utils'
import { getUserNfts } from 'utils'
import Axios from 'axios'

// StrainNFT.uri(_nftid) returns the nft uri address
// StrainNFTCrafter.craftStrainNFT sending it 0.03 ether (for rng)
// StrainNFT.setApprovalForAll(address _operator, bool _approved)

const Provider: React.FC = ({ children }) => {
  const [confirmTxModalIsOpen, setConfirmTxModalIsOpen] = useState(false)
  const [nftcollection, setNftCollection] = useState<NftInstance[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [isDestroying, setIsDestroying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { account, ethereum }: { account: string | null, ethereum: provider } = useWallet()

  const yam = useYam()

  console.log('strain nft, is yam undefined', yam === undefined);
  const fetchUsersNfts = useCallback(async (yam: any, userAddress: string, provider: provider) => {
    if (account === undefined || yam === undefined) {
      console.log('account, yam', account !== undefined, yam !== undefined)
      return
    }
    setIsLoading(true)

    getUserNfts(provider, getAddresses().strainNFTAddress, getAddresses().strainNFTCrafterAddress, userAddress)
      .then(nftinstances => {
        nftinstances.map(n => console.log('Nfts in provider', n))
        setNftCollection(nftinstances)
      })
      .catch(e => {
        setIsLoading(false);
      })

  }, [yam])


  useEffect(() => {
    if (account && ethereum && yam) {
      fetchUsersNfts(yam, account, ethereum)
      let refreshInterval = setInterval(() => fetchUsersNfts(yam, account, ethereum), 10000)
      return () => clearInterval(refreshInterval)
    }
  }, [
    account,
    ethereum,
    fetchUsersNfts,
    yam,
  ])

  const handleCreateNft = useCallback(async (poolId: string, amount: string, name: string) => {
    console.log('strain nft, create, is yam undefined', yam === undefined);
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsCreating(true)
    await generateNft(yam.contracts.strain_nft_crafter, yam.web3.eth, poolId, amount, name, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsCreating(false)
    })
    setIsCreating(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsCreating,
    yam
  ])

  const handleDestroyNft = useCallback(async (poolId: string, nftId: string) => {
    if (!yam) return
    setConfirmTxModalIsOpen(true)
    setIsDestroying(true)
    await burnNft(yam.contracts.strain_nft_crafter, yam.web3.eth, nftId, poolId, account, () => {
      setConfirmTxModalIsOpen(false)
    }).catch(e => {
      console.error(e)
      setIsDestroying(false)
    })
    setIsDestroying(false)
  }, [
    account,
    setConfirmTxModalIsOpen,
    setIsDestroying,
    yam
  ])

  const handleNftRetrive = useCallback(async (nft: NftInstance): Promise<NftInstance> => {
    console.log('handleNftRetrive called', nft)
    if (!nft?.dataUrl) return nft;

    Axios.get(nft.dataUrl)
    const promise = Axios.get(nft.dataUrl)
    return promise.then(response => ({...nft, attribs: response.data}));
  }, [])

  return (
    <Context.Provider value={{
      setConfirmTxModalIsOpen,
      strainNftCollection: nftcollection,
      onDestroyNft: handleDestroyNft,
      onRetrieve: handleNftRetrive,
      onCreateNft: handleCreateNft,      
      isCreating,
      isDestroying,
      isLoading,      
    }}>
      {children}
    </Context.Provider>
  )
}

export default Provider