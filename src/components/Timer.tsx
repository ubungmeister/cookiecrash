import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import button from "../images/but.png";

export type TimerType ={
    endGame: (end:boolean)=>void
    score:number
}
export interface TimeColorProps{
    time:number
}
export const Timer = (props:TimerType)=>{


    const [time, setTime] =useState(5)

    useEffect(() => {
        console.log('s')
        if(time>0){
            const timer = setInterval(() => {
                setTime(time - 1)
            }, 1000)
        return () => clearInterval(timer)}
        },[time]
    )
    if (time === 0){
        props.endGame(false)
    }
    return(
        <div>
        {time
            ?<TimeWrapper time={time}>{time}</TimeWrapper>
            : time <=5? <TimeWrapper time={time}>Time is over</TimeWrapper>
            : <TimeWrapper time={time}>Time is over</TimeWrapper>}
        </div>
    )
}

const TimeWrapper= styled.div<TimeColorProps>`
  background-image: url(${button});
  padding: 10px;
  margin-left: 55px;
  font-size: 22px;
  text-align: center;
  color: ${props=>props.time > 5 ? 'white' :'red'};
  background-size: 180px;
  border-radius: 10px;
  border: none;
  width: 180px;
  height: 54px ;
  opacity: 0.9;
  cursor: pointer
`