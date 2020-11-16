import React, { useMemo } from 'react'

import {
    Box,
    Button,
} from 'react-neu'
import { useWallet } from 'use-wallet'

import useFarming from 'hooks/useFarming'
import { getItemValue } from 'utils'
import { PoolIds } from 'constants/poolValues'

const Redeem: React.FC = () => {
    const { status } = useWallet()
    const {
        isRedeeming,
        onRedeem,
    } = useFarming()

    const RedeemButton = useMemo(() => {
        if (status !== 'connected') {
            return (
                <Button
                    disabled
                    text="Claim &amp; Unstake"
                    variant="secondary"
                />
            )
        }
        if (!getItemValue(isRedeeming, PoolIds.STRN_SINGLE)) {
            return (
                <Button
                    onClick={() => onRedeem(PoolIds.STRN_SINGLE)}
                    text="Claim &amp; Unstake"
                    variant="secondary"
                />
            )
        }
        return (
            <Button
                disabled
                text="Redeeming..."
                variant="secondary"
            />
        )
    }, [
        String(isRedeeming),
        onRedeem,
    ])

    return (
        <Box row justifyContent="center">
            {RedeemButton}
        </Box>
    )
}

export default Redeem