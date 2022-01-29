export const boardService = {
    createBoard,
    createEmptyBoard
}

function createBoard(){
    const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
    const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    let tempBoard = []
    const blackTile = 'black-tile'
    const whiteTile = 'white-tile'
    let tileClass = ''
    let piece = 'blank'
    for (let i = verticalAxis.length - 1; i >= 0; i--) {
      for (let j = 0; j < horizontalAxis.length; j++) {
        const number = i + j + 2;

        if (number % 2 === 0) {
          tileClass = blackTile
        } else {
          tileClass = whiteTile
        }

        if (i < 3 && tileClass === blackTile) piece = ' black'
        else if (i > 4 && tileClass === blackTile) piece = ' white'
        else piece = 'blank'
        tempBoard.push({
          tileClass: `tile ${tileClass} ${i}-${j}`,
          pieceType: piece,
          i,
          j
        }
        )
      }
    }
    return tempBoard
}

function createEmptyBoard(){
  const verticalAxis = ['1', '2', '3', '4', '5', '6', '7', '8']
  const horizontalAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
  let tempBoard = []
  const blackTile = 'black-tile'
  const whiteTile = 'white-tile'
  let tileClass = ''
  let piece = 'blank'
  for (let i = verticalAxis.length - 1; i >= 0; i--) {
    for (let j = 0; j < horizontalAxis.length; j++) {
      const number = i + j + 2;

      if (number % 2 === 0) {
        tileClass = blackTile
      } else {
        tileClass = whiteTile
      }

      tempBoard.push({
        tileClass: `tile ${tileClass} ${i}-${j}`,
        pieceType: piece,
        i,
        j
      }
      )
    }
  }
  return tempBoard
}