import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import cookie1 from './images/pastry_cookie01_320.png'
import cookie2 from './images/pastry_croissant_320@2x.png'
import cookie3 from './images/pastry_donut_320.png'
import cookie4 from './images/pastry_macaroon_320.png'
import cookie5 from './images/pastry_starcookie01_320.png'
import cookie6 from './images/pastry_cupcake_320.png'
import backgroundCookie from './images/GameTileBG_01@2x.png'
import sc from './images/rem.png'
import {CheckMatches} from "./components/utils";

const width = 8

const cookieName = [
    cookie1,
    cookie2,
    cookie3,
    cookie4,
    cookie5,
    cookie6
]

function App() {

    const [itemBeingDragged, setItemBeingDragged] = useState<Element | null>()
    const [itemBeingReplaced, setItemBeingReplaced] = useState<Element | null>()
    const[score, setScore]=useState(0)

    const itemBeingDraggedID = Number(itemBeingDragged?.getAttribute('data-id'))
    const itemBeingReplacedId = Number(itemBeingReplaced?.getAttribute('data-id'))

    const newArray = [...Array(width * width)].map(
        () => cookieName[Math.floor(Math.random() * cookieName.length)]
    )
    const [currentCookieArrangement, setCurrentColorArrangement] = useState<string[]>(newArray)


    const addState = () => {
        //CheckMatches => match logic + move elements if they matched, return array + boolean
        let a = CheckMatches(currentCookieArrangement,width,validMove,cookieName,itemBeingReplaced)
        setCurrentColorArrangement(a.arr)
        setScore(score + a.score)
        return a.result //use it to drag elements

    }

    const dragStart = (el: Element) => {
        setItemBeingDragged(el)
    }
    const dragDrop = (el: Element) => {
        setItemBeingReplaced(el)
    }


    const validMove = () => {
        const validMoves = [
            itemBeingDraggedID + 1,
            itemBeingDraggedID - 1,
            itemBeingDraggedID - width,
            itemBeingDraggedID + width
        ]
        return validMoves.includes(itemBeingReplacedId)
    }


    const dragEnd = () => {

        const colorBeingDragged = String(itemBeingDragged?.getAttribute('src'))
        const colorBeingReplaced = String(itemBeingReplaced?.getAttribute('src'))

        currentCookieArrangement[itemBeingReplacedId] = colorBeingDragged
        currentCookieArrangement[itemBeingDraggedID] = colorBeingReplaced

        const isColumnOrRowMatch = addState()


        if (itemBeingReplacedId && (isColumnOrRowMatch)) {
            setItemBeingDragged(null)
            setItemBeingReplaced(null)

        }
        else {
            currentCookieArrangement[itemBeingReplacedId] = colorBeingReplaced
            currentCookieArrangement[itemBeingDraggedID] = colorBeingDragged
            setCurrentColorArrangement([...currentCookieArrangement])
        }
    }
    useEffect(() => {
        addState()
        const timer = setInterval(() => {
            setCurrentColorArrangement([...currentCookieArrangement])
        }, 140)
        return () => clearInterval(timer)

    }, [currentCookieArrangement])

    return (
        <Container>
            <ScorePanel>
                <ScoreBoardWrapper>Your score: {score}</ScoreBoardWrapper>
                <RestartButton onClick={()=>setScore(0)}></RestartButton>
            </ScorePanel>
            <GameWrapper>
                {currentCookieArrangement.map((el, index) => {
                    return (
                        <IconWrapper
                            key={index}
                            src={el}
                            data-id={index}
                            draggable={true}
                            onDragStart={(el) => dragStart(el.currentTarget as Element)}
                            onDragOver={(e) => e.preventDefault()}
                            onDragEnter={(e) => e.preventDefault()}
                            onDragLeave={(e) => e.preventDefault()}
                            onDrop={(el) => dragDrop(el.currentTarget as Element)}
                            onDragEnd={dragEnd}
                        />

                    )
                })}

            </GameWrapper>
        </Container>
    );
}

export default App;


const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  padding: 60px;
  border-radius: 10px;
  justify-content: center;
  
  
`
const GameWrapper = styled.div`
  width: 480px;
  height: 480px;
  display: flex;
  flex-wrap: wrap;
  
`
const IconWrapper = styled.img`
  width: 60px;
  height: 60px;
  background-image:url(${backgroundCookie}) ;
`
const ScorePanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 80px;
  
  
  
`
const RestartButton = styled.div`
  background-image: url(${sc});
  color: white;
  background-size: 140px;
  border-radius: 10px;
  border: none;
  width: 130px;
  height: 50px ;
  cursor: pointer
`
const ScoreBoardWrapper = styled.div`
  background-image: url(${backgroundCookie});
  color: white;
  background-size: 100px;
  border-radius: 10px;
  width: 150px;
  height: 50px ;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 20px;
`