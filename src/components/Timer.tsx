import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import button from "../images/but.png";

export type TimerType = {
    startGame: (end: boolean) => void
    score: number
}

export interface TimeColorProps {
    time: number
}

export const Timer = (props: TimerType) => {


    const [time, setTime] = useState(45)

    useEffect(() => {
            if (time > 0) {
                const timer = setInterval(() => {
                    setTime(time - 1)
                }, 1000)
                return () => clearInterval(timer)
            }
        }, [time]
    )
    if (time === 0) {
        props.startGame(false)
    }
    const timer = time > 0 ? `0:${time}` : `Time is over`

    return (
        <div>
            <TimeWrapper time={time}>{timer}</TimeWrapper>
        </div>
    )
}

const TimeWrapper = styled.div<TimeColorProps>`
  background-image: url(${button});
  padding: 10px;
  margin-left: 55px;
  font-size: ${props => props.time === 45 ? '23px' : '22px'};
  text-align: center;
  color: ${props => props.time === 45 ? 'yellow' : props.time > 5 ? 'white' : 'red'};
  background-size: 180px;
  border-radius: 10px;
  border: none;
  width: 180px;
  height: 54px;
  opacity: 0.9;
  cursor: pointer
`