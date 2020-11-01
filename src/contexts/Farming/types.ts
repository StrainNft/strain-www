import BigNumber from 'bignumber.js'

export interface ContextValues {
  earnedBalance?: BigNumber,
  isApproved?: boolean,
  isApproving?: boolean,
  isHarvesting?: boolean,
  isRedeeming?: boolean,
  isStaking?: boolean,
  isUnstaking?: boolean,
  onApprove: () => void,
  onHarvest: () => void,
  onRedeem: (poolId: string) => void,
  onStake: (poolId: string, amount: string) => void,
  onUnstake: (poolId: string, amount: string) => void,
  stakedBalance?: BigNumber,
}