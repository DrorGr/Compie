import React, { useEffect, useState, useRef } from 'react';
import { boardService } from '../services/boardService.js'
import { Pawn } from '../cmps/Pawn'


export function Checkers() {
  const [board, setBoard] = useState([])
  const [blackTurn, setBlackTurn] = useState(true)
  const [currBoard, setCurrBoard] = useState([])
  const currPawn = useRef()

  useEffect(() => {
    setBoard(boardService.createEmptyBoard())
  }, [])

  const handleClick = (pieceData, idx) => {
    const { pieceType, i, j } = pieceData
    let cell1Idx
    let cell2Idx

    let tempBoard = JSON.parse(JSON.stringify(board))

    if (pieceType === 'blank') return

    if (!pieceType.includes('clue')) handleClickIfPawn(tempBoard, pieceType, i, j, idx, cell1Idx, cell2Idx)
    else handleClickIfClue(tempBoard, pieceType, i, j, idx, cell1Idx, cell2Idx)

    setBoard(tempBoard)
  }

  const handleClickIfPawn = (tempBoard, pieceType, i, j, idx, cell1Idx, cell2Idx) => {

    if ((blackTurn && pieceType.includes('white')) || (!blackTurn && pieceType.includes('black'))) return

    currPawn.current = idx

    tempBoard.forEach((tile) => {
      if (tile.pieceType === 'clue') tile.pieceType = 'blank'
    })

    if (blackTurn) {
      cell1Idx = getIndex(i + 1, j + 1)
      cell2Idx = getIndex(i + 1, j - 1)
    } else {
      cell1Idx = board.findIndex(cell => cell.i === i - 1 && cell.j === j - 1)
      cell2Idx = board.findIndex(cell => cell.i === i - 1 && cell.j === j + 1)
    }

    if (tempBoard[cell1Idx] &&
      tempBoard[cell1Idx].pieceType === 'blank') tempBoard[cell1Idx].pieceType = 'clue'
    if (tempBoard[cell2Idx] &&
      tempBoard[cell2Idx].pieceType === 'blank') tempBoard[cell2Idx].pieceType = 'clue'

    if (blackTurn) {
      if (tempBoard[cell1Idx] && tempBoard[cell1Idx].pieceType === 'white') {
        const whiteIpos = tempBoard[cell1Idx].i
        const whiteJpos = tempBoard[cell1Idx].j
        const nextCell = getIndex(whiteIpos + 1, whiteJpos + 1)
        if (tempBoard[nextCell] &&
          tempBoard[nextCell].pieceType === 'blank') tempBoard[nextCell].pieceType = 'clue'
      }
      if (tempBoard[cell2Idx] && tempBoard[cell2Idx].pieceType === 'white') {
        const whiteIpos = tempBoard[cell2Idx].i
        const whiteJpos = tempBoard[cell2Idx].j
        const nextCell = getIndex(whiteIpos + 1, whiteJpos - 1)
        if (tempBoard[nextCell] &&
          tempBoard[nextCell].pieceType === 'blank') tempBoard[nextCell].pieceType = 'clue'
      }
    } else {
      if (tempBoard[cell1Idx] && tempBoard[cell1Idx].pieceType === 'black') {
        const blackIpos = tempBoard[cell1Idx].i
        const blackJpos = tempBoard[cell1Idx].j
        const nextCell = getIndex(blackIpos - 1, blackJpos - 1)
        if (tempBoard[nextCell] &&
          tempBoard[nextCell].pieceType === 'blank') tempBoard[nextCell].pieceType = 'clue'
      }
      if (tempBoard[cell2Idx] && tempBoard[cell2Idx].pieceType === 'black') {
        const blackIpos = tempBoard[cell2Idx].i
        const blackJpos = tempBoard[cell2Idx].j
        const nextCell = getIndex(blackIpos - 1, blackJpos + 1)
        if (tempBoard[nextCell] &&
          tempBoard[nextCell].pieceType === 'blank') tempBoard[nextCell].pieceType = 'clue'
      }
    }
  }

  const handleClickIfClue = (tempBoard, pieceType, i, j, idx) => {
    const currPawnI = tempBoard[currPawn.current].i
    const currPawnJ = tempBoard[currPawn.current].j

    if (blackTurn) {
      const prevCell1 = getIndex(i - 1, j - 1)
      const prevCell2 = getIndex(i - 1, j + 1)
      if (currPawnI === i - 2 && currPawnJ === j + 2 && tempBoard[prevCell2].pieceType === 'white') {
        tempBoard[prevCell2].pieceType = 'blank'
      }

      if (currPawnI === i - 2 && currPawnJ === j - 2 && tempBoard[prevCell1].pieceType === 'white') {
        tempBoard[prevCell1].pieceType = 'blank'
      }
    } else {
      const prevCell1 = getIndex(i + 1, j + 1)
      const prevCell2 = getIndex(i + 1, j - 1)

      if (currPawnI === i + 2 && currPawnJ === j - 2 && tempBoard[prevCell2].pieceType === 'black') {
        tempBoard[prevCell2].pieceType = 'blank'
      }

      if (currPawnI === i + 2 && currPawnJ === j + 2 && tempBoard[prevCell1].pieceType === 'black') {
        tempBoard[prevCell1].pieceType = 'blank'
      }
    }

    tempBoard[currPawn.current].pieceType = 'blank'
    const cluePos = getAllIndexes(tempBoard, 'clue')
    cluePos.map((pos) => ( tempBoard[pos].pieceType = 'blank' ))
    if (blackTurn) tempBoard[idx].pieceType = 'black'
    else tempBoard[idx].pieceType = 'white'
    setBlackTurn(!blackTurn)

    if (currBoard.length < 2) {
      setCurrBoard(prevBoard => [...prevBoard, tempBoard])
    } else {
      const newCurrBoard = [currBoard[1], tempBoard]
      setCurrBoard(newCurrBoard)
    }
  }

  const getIndex = (i, j) => {
    return board.findIndex(cell => cell.i === i && cell.j === j)
  }

  const getAllIndexes = (arr, val) => {
    let indexes = [], i;
    for (i = 0; i < arr.length; i++)
      if (arr[i].pieceType === val)
        indexes.push(i);
    return indexes;
  }

  const handleRestart = () => {
    setBoard(boardService.createBoard())
    setBlackTurn(true)
    setCurrBoard([boardService.createBoard()])
  }

  const handleUndo = () => {
    if (currBoard.length < 1) return
    setBoard(currBoard[0])
    setBlackTurn(!blackTurn)
  }

  const handleRedo = () => {
    if (currBoard.length <= 1) return
    setBoard(currBoard[1])
    setBlackTurn(!blackTurn)
  }

  
    
  return (
    
    <div  className="board">
      <h1>Compie's Checkers</h1>
      <div className="btns-container">
        <button className="start-btn" onClick={handleRestart}>{currBoard.length < 1 ? 'Press to Start' : 'Start Over'}</button>
        <button className="undo-btn" onClick={handleUndo}>Undo</button>
        <button className="redo-btn" onClick={handleRedo}>Redo</button>
        
      </div>
      <div className="board-container">
        {board.map((pieceData, idx) => {
          return (<div key={Math.random().toString(36).substr(2, 9)} className={pieceData.tileClass} data-idx={idx} onClick={() => handleClick(pieceData, idx)}>
            <Pawn pawnType={pieceData.pieceType}></Pawn></div>)
        })
      }
      </div>
    </div>
  )
}