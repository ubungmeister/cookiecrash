import React, {useEffect, useState} from 'react';
import styled from "styled-components";

import cookie1 from './images/1.png'
import cookie2 from './images/2.png'
import cookie3 from './images/3.png'
import cookie4 from './images/4.png'
import cookie5 from './images/5.png'
import cookie6 from './images/6.png'


const width = 8
const cookieName = [
    cookie1,
    cookie2,
    cookie3,
    cookie4,
    cookie5,
    cookie6
]
console.log(typeof cookieName)

function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([''])
    const [itemBeingDragged, setItemBeingDragged] = useState<Element|null>()
    const [itemBeingReplaced,setItemBeingReplaced] = useState<Element|null>()
    const [score, setScore] = useState(0)

    const createBoard = () => {
        const randomCookieArr = []
        for (let i = 0; i < width**2; i++) {
            const randomCookie = cookieName[Math.floor(Math.random() * cookieName.length)]
            randomCookieArr.push(randomCookie)
        }
        setCurrentColorArrangement(randomCookieArr)
    }
    useEffect(() => {
        createBoard()
    }, [])


    const checkColumnOfFour = () => {
        for (let i = 0; i <= 39; i++) {
            const columnOfFour = [i, i + width, i + width * 2, i + width * 3]
            const decidedColor = currentColorArrangement[i]
            if (!validMove()) continue

            if (columnOfFour.every(item => currentColorArrangement[item] === decidedColor)) {
                columnOfFour.forEach(item => currentColorArrangement[item] = '')

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
    const checkRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOffour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            if (notValid.includes(i)) continue
            if (!validMove()) continue
            if (rowOffour.every(item => currentColorArrangement[item] === decidedColor)) {
                rowOffour.forEach(item => currentColorArrangement[item] = '')

                return true
            }
        }
    }
    const checkRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            if (notValid.includes(i)) continue
            if (!validMove()) continue
            if (rowOfThree.every(item => currentColorArrangement[item] === decidedColor)) {
                rowOfThree.forEach(item => currentColorArrangement[item] = '')

                return true
            }
        }
    }
    const moveElementBelow =()=>{
        for(let i=0; i<=55; i++){
            const firstRow = [0,1,2,3,4,5,6,7]

            if (firstRow.includes(i) && currentColorArrangement[i] === ''){
                let randomColor = cookieName[Math.floor(Math.random() * cookieName.length)]
                currentColorArrangement[i]= randomColor
            }

            if (currentColorArrangement[i+width] === ''){
                currentColorArrangement[i+width] =currentColorArrangement[i]
                currentColorArrangement[i]=''
            }
        }
    }

    const dragStart =(el:Element)=>{
        setItemBeingDragged(el)
    }
    const dragDrop =(el:Element)=>{
        setItemBeingReplaced(el)
    }
    const validMove =()=>{
        const itemBeingDraggedID = Number(itemBeingDragged?.getAttribute('data-id'))
        const itemBeingReplacedId = Number(itemBeingReplaced?.getAttribute('data-id'))
        const validMoves = [
            itemBeingDraggedID +1,
            itemBeingDraggedID -1,
            itemBeingDraggedID - width,
            itemBeingDraggedID + width
        ]
        const isValid = validMoves.includes(itemBeingReplacedId)
        return isValid
    }



    const dragEnd =()=>{

        const itemBeingDraggedID = Number(itemBeingDragged?.getAttribute('data-id'))
        const itemBeingReplacedId = Number(itemBeingReplaced?.getAttribute('data-id'))
        const colorBeingDragged = String(itemBeingDragged?.getAttribute('src'))
        const colorBeingReplaced = String(itemBeingReplaced?.getAttribute('src'))

        currentColorArrangement[itemBeingReplacedId] = colorBeingDragged
        currentColorArrangement[itemBeingDraggedID] = colorBeingReplaced


        const isColumnOfFour =checkColumnOfFour()
        const isRowOfFour =checkRowOfFour()
        const isColumnOfThree =checkColumnOfThree()
        const isRowOfThree = checkRowOfThree()


        if(itemBeingReplacedId && (isColumnOfFour||isRowOfFour||isColumnOfThree||isRowOfThree)){
            setItemBeingDragged(null)
            setItemBeingReplaced(null)
        } else {
            currentColorArrangement[itemBeingReplacedId] = colorBeingReplaced
            currentColorArrangement[itemBeingDraggedID] = colorBeingDragged
            setCurrentColorArrangement([...currentColorArrangement])
        }
    }
    useEffect(() => {
        const timer = setInterval(() => {
            checkColumnOfFour()
            checkRowOfFour()
            checkColumnOfThree()
            checkRowOfThree()
            moveElementBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 100)
        return () => clearInterval(timer)
    }, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree,currentColorArrangement, moveElementBelow])

    return (
        <Container>
            <div>{score}</div>
            <GameWrapper>
                {currentColorArrangement.map((el, index) => {
                    return (
                        <IconWrapper
                            key={index}
                            src={el}
                            data-id={index}
                            draggable={true}
                            onDragStart={(el)=>dragStart(el.currentTarget as Element)}
                            onDragOver={(e)=>e.preventDefault()}
                            onDragEnter={(e)=>e.preventDefault()}
                            onDragLeave={(e)=>e.preventDefault()}
                            onDrop={(el)=>dragDrop(el.currentTarget as Element)}
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
  padding: 30px;
`
const GameWrapper = styled.div`
  width: 560px;
  height: 560px;
  display: flex;
  flex-wrap: wrap;
`
const IconWrapper = styled.img`
  width: 70px;
  height: 70px;
`