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
    const [currentColorArrangement, setCurrentColorArrangement] = useState([''])
    const [itemBeingDragged, setItemBeingDragged] = useState<Element | null>()
    const [itemBeingReplaced, setItemBeingReplaced] = useState<Element | null>()
    const[score, setScore]=useState(0)

    //create a new bord 8x8 with random cookies
    // const createBoard = () => {
    //     setCurrentColorArrangement(
    //         [...Array(width * width)].map(
    //             () => cookieName[Math.floor(Math.random() * cookieName.length)]
    //         )
    //     );
    // } kak prosto peredat znacenie v useState(['']) bez useEffect

    useEffect(() => {
        setCurrentColorArrangement(
            [...Array(width * width)].map(
                () => cookieName[Math.floor(Math.random() * cookieName.length)]
            )
        );
    }, [])


    const checkColumnOfFour = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]

            if (!validMove()) continue
            if (columnOfFour.every(item => currentColorArrangement[item] === decidedColor)) {
                columnOfFour.forEach(item => currentColorArrangement[item] = '')
                return true
            }

        }
    }
    const checkRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOffour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            //instead of using indexes of items, we don't need las 3 row to check
            if (i % 8 >= 5) continue

            if (!validMove()) continue
            if (rowOffour.every(item => currentColorArrangement[item] === decidedColor)) {
                rowOffour.forEach(item => currentColorArrangement[item] = '')

                return true
            }
        }
    }
    const checkColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]
            if (!validMove()) continue
            if (columnOfThree.every(item => currentColorArrangement[item] === decidedColor)) {
                columnOfThree.forEach(item => currentColorArrangement[item] = '')
                return true
            }
        }
    }

    const checkRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            //instead of using indexes of items, we don't need las 2 row to check
            if (i % 8 >= 6) continue

            if (!validMove()) continue
            if (rowOfThree.every(item => currentColorArrangement[item] === decidedColor)) {
                rowOfThree.forEach(item => currentColorArrangement[item] = '')
                return true
            }
        }
    }
    const moveElementBelow = () => {
        for (let i = 0; i <= 55; i++) {
            const firstRow = [0, 1, 2, 3, 4, 5, 6, 7]
            if (firstRow.includes(i) && currentColorArrangement[i] === '') {
                currentColorArrangement[i] = cookieName[Math.floor(Math.random() * cookieName.length)]
            }

            if (currentColorArrangement[i + width] === '') {
                currentColorArrangement[i + width] = currentColorArrangement[i]
                currentColorArrangement[i] = ''
            }
        }
    }

    const dragStart = (el: Element) => {
        setItemBeingDragged(el)
    }
    const dragDrop = (el: Element) => {
        setItemBeingReplaced(el)
    }

    const itemBeingDraggedID = Number(itemBeingDragged?.getAttribute('data-id'))
    const itemBeingReplacedId = Number(itemBeingReplaced?.getAttribute('data-id'))

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

        currentColorArrangement[itemBeingReplacedId] = colorBeingDragged
        currentColorArrangement[itemBeingDraggedID] = colorBeingReplaced


        const isColumnOfFour = checkColumnOfFour()
        const isRowOfFour = checkRowOfFour()
        const isColumnOfThree = checkColumnOfThree()
        const isRowOfThree = checkRowOfThree()


        if (itemBeingReplacedId && (isColumnOfFour || isRowOfFour || isColumnOfThree|| isRowOfThree)) {
            setItemBeingDragged(null)
            setItemBeingReplaced(null)

            // score counter
            if(isColumnOfFour || isRowOfFour ){
                setScore((s)=>s+4)
            }else {setScore((s)=>s+3)}
        }
        else {
            currentColorArrangement[itemBeingReplacedId] = colorBeingReplaced
            currentColorArrangement[itemBeingDraggedID] = colorBeingDragged
            setCurrentColorArrangement([...currentColorArrangement])
        }
    }
    useEffect(() => {
        checkColumnOfFour()
        checkRowOfFour()
        checkColumnOfThree()
        checkRowOfThree()
        moveElementBelow()

        const timer = setInterval(() => {
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)

    }, [currentColorArrangement])

    return (
        <Container>
            <ScorePanel>
                <ScoreBoardWrapper>Your score: {score}</ScoreBoardWrapper>
                <RestartButton onClick={()=>setScore(0)}></RestartButton>
            </ScorePanel>
            <GameWrapper>
                {currentColorArrangement.map((el, index) => {
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