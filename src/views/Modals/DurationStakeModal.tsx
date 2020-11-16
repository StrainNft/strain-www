import React, { useCallback, useEffect, useMemo, useState } from 'react'

import BigNumber from 'bignumber.js'
import {
  Box,
  Button,
  Modal,
  ModalActions,
  ModalContent,
  ModalProps,
  ModalTitle,
} from 'react-neu'

import TokenInput from 'components/TokenInput'
import DatePicker from 'react-datepicker'
import styled from 'styled-components'
import SplitRow from 'components/SplitRow'
import { useMedia } from 'react-use'
require('react-datepicker/dist/react-datepicker.css')

interface StakeModalProps extends ModalProps {
  onStake: (duration: string, amount: string) => void,
  label: string,
  fullBalance?: BigNumber
  maxTimestamp?: BigNumber
}

const DurationStakeModal: React.FC<StakeModalProps> = ({
  isOpen,
  onDismiss,
  onStake,
  label,
  fullBalance,
  maxTimestamp
}) => {
  const secondsInDay = 86400;
  const maxDuration = 180 * secondsInDay;
  const minInterval = 15 * 60;

  const [val, setVal] = useState('')
  const [duration, setDuration] = useState(minInterval)
  const [durationDate, setDurationDate] = useState<Date | null>(new Date())
  const [boost, setBoost] = useState<number>(0)
  const [maxDate, setMaxDate] = useState<Date | null>()
  const below800 = useMedia('(max-width: 800px)')

  useEffect(() => {
    if (maxTimestamp?.gt(0)) {
      setMaxDate(new Date(maxTimestamp?.toNumber() * 1000))
    }
  }, [maxTimestamp])

  useEffect(() => {
    if (durationDate) {
      let maxTime = Math.floor(durationDate.getTime() / 1000)
      if (maxTimestamp && maxTime > maxTimestamp?.toNumber()) {
        maxTime = maxTimestamp.toNumber()
      }
      const dur = Math.floor(maxTime - (new Date().getTime() / 1000))
      // 1 + (3.2 * <duration> / 180)
      const calcBoost = 1 + (3.2 * dur / maxDuration)

      setBoost(calcBoost)
      if (dur > 0) setDuration(dur)
    }
  }, [durationDate])

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setVal(e.currentTarget.value)
  }, [setVal])

  const handleSelectMax = useCallback(() => {
    setVal(String(fullBalance || 0))
  }, [fullBalance, setVal])

  const handleStakeClick = useCallback(() => {
    onStake(String(duration), val)
  }, [onStake, val])

  const StyledCenter = styled.div`
    align-self: center;
  `
  const StyledLabel = styled.div`
    font-size: 16px;
    color: ${props => props.theme.colors.grey[500]};
    padding-bottom: 0.15rem;
  `
  const StyledLabelValue = styled.div`
    font-size: 18px;
  `
  const SpaceBetweenRow = styled.div`
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.25rem;    
  `

  return (
    <Modal isOpen={isOpen}>
      <ModalTitle text="Stake" />
      <ModalContent>
        <StyledCenter>
          <SpaceBetweenRow>
            <div>
              <StyledLabel>Lock up boost:</StyledLabel>
              <StyledLabelValue>{boost.toFixed(2)}</StyledLabelValue>
            </div>
            <div>
              <StyledLabel>Lock till:</StyledLabel>
              <StyledLabelValue>{durationDate?.toDateString()}</StyledLabelValue>
            </div>
          </SpaceBetweenRow>
          <DatePicker selected={durationDate} onChange={date => {
            if (date && date !== durationDate) {
              setDurationDate(date as Date)
            }
          }}
            minDate={new Date(new Date().getTime() + secondsInDay * 1000)}
            maxDate={maxDate}
            monthsShown={below800 ? 1 : 2}
            inline
          />
        </StyledCenter>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={String(fullBalance || 0)}
          symbol={label}
        />
      </ModalContent>
      <ModalActions>
        <Button
          onClick={onDismiss}
          text="Cancel"
          variant="secondary"
        />
        <Button
          disabled={!val || !Number(val) || duration === 0}
          onClick={handleStakeClick}
          text="Stake"
          variant={!val || !Number(val) ? 'secondary' : 'default'}
        />
      </ModalActions>
    </Modal>
  )
}

export default DurationStakeModal