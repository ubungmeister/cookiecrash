import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import button from "../images/but.png";

export type TimerType ={
    endtGame: (end:boolean)=>void
    score:number

}
export const Timer = (props:TimerType)=>{


    const [time, setTime] =useState(59)

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
        props.endtGame(true)
    }
    return(
        <TimeWrapper>{time}</TimeWrapper>
    )
}

const TimeWrapper= styled.div`
  background-image: url(${button});
  padding: 10px;
  font-size: 22px;
  text-align: center;
  color: white;
  background-size: 180px;
  border-radius: 10px;
  border: none;
  width: 180px;
  height: 54px ;
  cursor: pointer
`