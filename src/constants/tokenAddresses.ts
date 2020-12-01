export const yam = '0x0e2298e3b3390e3b945a5456fbf59ecc3f55da16'
export const yamv2 = '0xaba8cac6866b83ae4eec97dd07ed254282f6ad8a'
export const yamv3 = '0x0AaCfbeC6a24756c20D41914F2caba817C0d8521'
export const yUsd = '0x5dbcf33d8c2e976c6b560249878e6f1491bca25c'
export const yycrvUniLp = '0xb93Cc05334093c6B3b8Bfd29933bb8d5C031caBC'
export const migrator = '0x72cfed9293cbfb2bfc7515c413048c697c6c811c'

// harcode chainId for wallet provider lib
export const chainId = 4;
export const base_image_url = 'https://nft-image-service.herokuapp.com/'

// mainnet
const strn = '0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f'
const strnEthLP = '0xa198f36e3648dd16e75d721f0c6516e00e9ca053'
const strnIncentivizer = '0x19Bf9bef453f57983319Eb3033a95a7aa7DB764d'
// make sure to update the addresses in json files
// src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
// src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
const strnXiotLP = '0xae14831467c8d0e3153aba2ea009bcdc485125a2'
const strnXiotIncentivizer = '0x0B864C8eD32457C83d3E35b47200085E96005425'

// -- single staking
const stxp = '0xdCF1d98F100445e1D74c3aedD0a90c565a8Da772'
// src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
const singleStrnPool = '0x69dc085C3C51F5ef74C737E817DD2A271e772B17'


// rinkeby
//export const strn = '0x78D5980a293010339e3Fe09f860230733A327A4e'
//export const strnEthLP = '0xf45d6a4c2274f3334bbaed91ce64cca6ec8f4733'
//export const strnIncentivizer = '0x25d766A7e469741BE43C1dAD8439AF74a8344613'
// make sure to update the addresses in json files
// src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
// src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
//export const strnXiotLP = '0x42b230455c2bcaf3e4a02a5aa34e810b1dc56fba'
//export const strnXiotIncentivizer = '0xF70dE70202F326EA79f85C90e635F0abE338d73d'

// single staking
//export const stxp = '0x3edd4De183b1DCa836FaA4e98D0A32c5a79eC9F6'
// src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
//export const singleStrnPool = '0xCE8A1F067f636c4Fc2081E017aB6cE25182f5b26'
//export const strn = '0x9b0E1A31E8fA5E694CB607508B0cc546E0ACf8ea'


const addresses = {
    1: {
        strnTokenAddress: '0x90b426067be0b0ff5de257bc4dd6a4815ea03b5f',
        strnLPTokenAddress: '0xa198f36e3648dd16e75d721f0c6516e00e9ca053',
        strnEthIncAddress: '0x19Bf9bef453f57983319Eb3033a95a7aa7DB764d',

        // src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
        // src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
        strnXiotLPTokenAddress: '0xae14831467c8d0e3153aba2ea009bcdc485125a2',
        strnXiotPoolAddress: '0x0B864C8eD32457C83d3E35b47200085E96005425',

        // -- single staking
        stxpTokenAddress: '0xdCF1d98F100445e1D74c3aedD0a90c565a8Da772',
        // src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
        singleStrnPool: '0x69dc085C3C51F5ef74C737E817DD2A271e772B17',

        strainNFTAddress: '0x78357271b76161aEB280D387D0da357aBB8824d4',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json        
        strainNFTCrafterAddress: '0x7b8B851D4e26D46f68bF3F2C67a220398B7DB234',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    },
    4: {
        strnTokenAddress: '0x32C1446E7542BbB3810e65CbFfb94a2aF396d27e',
        strnLPTokenAddress: '0x32C1446E7542BbB3810e65CbFfb94a2aF396d27e',
        strnEthIncAddress: '0x25d766A7e469741BE43C1dAD8439AF74a8344613',

        // src/yam-sdk/lib/clean_build/contracts/STRNIncentivizer.json
        // src/yam-sdk/lib/clean_build/contracts/STRNXIOTIncentivizer.json
        strnXiotLPTokenAddress: '0x42b230455c2bcaf3e4a02a5aa34e810b1dc56fba',
        strnXiotPoolAddress: '0xF70dE70202F326EA79f85C90e635F0abE338d73d',

        // -- single staking
        stxpTokenAddress: '0xdCF1d98F100445e1D74c3aedD0a90c565a8Da772',
        // src/yam-sdk/lib/clean_build/contracts/STXPIncentivizer.json
        singleStrnPool: '0x69dc085C3C51F5ef74C737E817DD2A271e772B17',

        strainNFTAddress: '0x0E624fb1f1fb305Ef90C13DF1E958122fDcB6a7C',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFT.json
        strainNFTCrafterAddress: '0xAa8E243AD2D50961D75105B1FAbF0f19cABfC0e8',
        // src/yam-sdk/lib/clean_build/contracts/StrainNFTCrafter.json
    }
}

export function getAddresses(): { [name: string]: string } {
    return addresses[chainId]
}