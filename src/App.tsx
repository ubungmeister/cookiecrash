import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import cookie1 from './images/pastry_cookie01_320.png'
import cookie2 from './images/pastry_croissant_320@2x.png'
import cookie3 from './images/pastry_donut_320.png'
import cookie4 from './images/pastry_macaroon_320.png'
import cookie5 from './images/pastry_starcookie01_320.png'
import cookie6 from './images/pastry_cupcake_320.png'
import backgroundCookie from './images/GameTileBG_01@2x.png'
import {CheckMatches} from "./components/utils";
import {Timer} from './components/Timer'
import button from './images/but.png'
import best from './images/bestscore.png'
import {motion} from "framer-motion";
import Confetti from "react-confetti";
import useLocalStorage from "use-local-storage";



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
    const [score, setScore] = useState(0)
    const [startGame, setStartGame] = useState(false)
    const [bestScore, setBestScore] = useState(0)
    const [item,setItem] = useLocalStorage('bestScore', 0)

    const newArray = [...Array(width * width)].map(
        () => cookieName[Math.floor(Math.random() * cookieName.length)])
    const [currentCookieArrangement, setCurrentCookieArrangement] = useState<string[]>(newArray)

    const itemBeingDraggedID = Number(itemBeingDragged?.getAttribute('data-id'))
    const itemBeingReplacedId = Number(itemBeingReplaced?.getAttribute('data-id'))

    const RestartHandler = () => {
        setScore(0)
        setStartGame(!startGame)
    }

    const addState = () => {
        //CheckMatches => match logic + move elements if they matched, return array + boolean
        const state = CheckMatches(
            currentCookieArrangement,
            width,
            validMove,
            cookieName,
            itemBeingReplaced,
            backgroundCookie)
        setCurrentCookieArrangement(state.arr)
        setScore(score + state.score)
        return state.result //use it to drag elements

    }
    //return true/false if move is valid
    const validMove = () => {
        const validMoves = [
            itemBeingDraggedID + 1,
            itemBeingDraggedID - 1,
            itemBeingDraggedID - width,
            itemBeingDraggedID + width
        ]
        return validMoves.includes(itemBeingReplacedId)
    }

    const dragStart = (el: Element) => {
        setItemBeingDragged(el)
    }
    const dragDrop = (el: Element) => {
        setItemBeingReplaced(el)
    }

    const dragEnd = () => {

        const colorBeingDragged = String(itemBeingDragged?.getAttribute('src'))
        const colorBeingReplaced = String(itemBeingReplaced?.getAttribute('src'))

        currentCookieArrangement[itemBeingReplacedId] = colorBeingDragged
        currentCookieArrangement[itemBeingDraggedID] = colorBeingReplaced

        const isColumnOrRowMatch = addState()


        if (itemBeingReplacedId && (isColumnOrRowMatch) && startGame) {
            setItemBeingDragged(null)
            setItemBeingReplaced(null)
        } else {
            currentCookieArrangement[itemBeingReplacedId] = colorBeingReplaced
            currentCookieArrangement[itemBeingDraggedID] = colorBeingDragged
            setCurrentCookieArrangement([...currentCookieArrangement])
        }
    }
    useEffect(() => {
        addState()
        const timer = setInterval(() => {
            setCurrentCookieArrangement([...currentCookieArrangement])
        }, 140)
        return () => clearInterval(timer)

    }, [currentCookieArrangement])


    useEffect(() => {
        if (score > bestScore) {
            setBestScore(score)
            setItem(score)
        }
    }, [startGame])

    const scoreButton = startGame? 'Play': 'Restart'


    return (
        <Container>
            <ScorePanel>
                {(startGame && score===bestScore) && <Confetti numberOfPieces={300} />}
                <BestScoreWrapper>Best Score: {item}</BestScoreWrapper>
                {startGame
                    ? <Timer startGame={setStartGame} score={score}/>
                    : <ScoreBoardWrapper>0:45</ScoreBoardWrapper>}
                <ScoreBoardWrapper>Score: {score}</ScoreBoardWrapper>
                <ScoreBoardWrapper whileHover={{scale: 1.1}} whileTap={{scale: 0.9}} onClick={RestartHandler}>{scoreButton}</ScoreBoardWrapper>
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
  background-image: url(${backgroundCookie});
  cursor: pointer
`
const ScorePanel = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 75px;
  gap: 12px;
`
const ScoreBoardWrapper = styled(motion.div)`
  background-image: url(${button});
  margin-left: 55px;
  padding: 10px;
  font-size: 22px;
  text-align: center;
  color: white;
  background-size: 180px;
  border-radius: 10px;
  width: 180px;
  height: 54px;
  cursor: pointer;
  opacity: 0.9;
`
const BestScoreWrapper = styled.div`
  background-image: url(${best});
  padding: 14px;
  font-size: 20px;
  text-align: center;
  color: white;
  background-size: 250px;
  border-radius: 10px;
  width: 250px;
  height: 65px;
  cursor: pointer;
  margin-left: 15px;
`
