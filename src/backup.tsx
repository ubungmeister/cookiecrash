import React, {useEffect, useState} from 'react';
import styled from "styled-components";

const width = 8
const cookieName = [
    'orange',
    'red',
    'black',
    'yellow',
    'purple',
    'green'
]

function App() {
    const [currentColorArrangement, setCurrentColorArrangement] = useState([''])
    const [itemBeingDragged, setItemBeingDragged] = useState<Element>()
    const [itemBeingReplaced,setItemBeingReplaced] = useState<Element>()


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

            if (columnOfFour.every(item => currentColorArrangement[item] === decidedColor)) {
                columnOfFour.forEach(item => currentColorArrangement[item] = '')
            }
        }
    }

    const checkColumnOfThree = () => {
        for (let i = 0; i <= 47; i++) {
            const columnOfThree = [i, i + width, i + width * 2]
            const decidedColor = currentColorArrangement[i]

            if (columnOfThree.every(item => currentColorArrangement[item] === decidedColor)) {
                columnOfThree.forEach(item => currentColorArrangement[item] = '')
            }
        }
    }
    const checkRowOfFour = () => {
        for (let i = 0; i < 64; i++) {
            const rowOffour = [i, i + 1, i + 2, i + 3]
            const decidedColor = currentColorArrangement[i]
            const notValid = [5, 6, 7, 13, 14, 15, 21, 22, 23, 29, 30, 31, 37, 38, 39, 45, 46, 47, 53, 54, 55, 62, 63, 64]
            if (notValid.includes(i)) continue

            if (rowOffour.every(item => currentColorArrangement[item] === decidedColor)) {
                rowOffour.forEach(item => currentColorArrangement[item] = '')
            }
        }
    }
    const checkRowOfThree = () => {
        for (let i = 0; i < 64; i++) {
            const rowOfThree = [i, i + 1, i + 2]
            const decidedColor = currentColorArrangement[i]
            const notValid = [6, 7, 14, 15, 22, 23, 30, 31, 38, 39, 46, 47, 54, 55, 63, 64]
            if (notValid.includes(i)) continue

            if (rowOfThree.every(item => currentColorArrangement[item] === decidedColor)) {
                rowOfThree.forEach(item => currentColorArrangement[item] = '')
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

    useEffect(() => {
        const timer = setInterval(() => {
            checkColumnOfFour()
            checkRowOfFour()
            checkColumnOfThree()
            checkRowOfThree()
            moveElementBelow()
            setCurrentColorArrangement([...currentColorArrangement])
        }, 500)
        return () => clearInterval(timer)
    }, [checkColumnOfFour, checkRowOfFour, checkColumnOfThree, checkRowOfThree,currentColorArrangement, moveElementBelow])

    const dragStart =(el:Element)=>{
        setItemBeingDragged(el)
    }
    const dragDrop =(el:Element)=>{
        setItemBeingReplaced(el)
    }
    const dragEnd =(el:Element)=>{

        const itemBeingDraggedID = Number(itemBeingDragged?.getAttribute('data-id'))
        const itemBeingReplacedId = Number(itemBeingReplaced?.getAttribute('data-id'))
        const color = itemBeingDragged?.getAttribute('backgroundColor')

        console.log(itemBeingDraggedID)
        console.log(color)

    }

    return (
        <Container>
            <GameWrapper>
                {currentColorArrangement.map((el, index) => {
                    return (
                        <IconWrapper
                            key={index}
                            style={{backgroundColor: el}}
                            alt = {el}
                            data-id={index}
                            draggable={true}
                            onDragStart={(el)=>dragStart(el.currentTarget)}
                            onDragOver={(e)=>e.preventDefault()}
                            onDragEnter={(e)=>e.preventDefault()}
                            onDragLeave={(e)=>e.preventDefault()}
                            onDrop={(el)=>dragDrop(el.target as Element)}
                            onDragEnd={(el)=>dragEnd(el.target as Element)}


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