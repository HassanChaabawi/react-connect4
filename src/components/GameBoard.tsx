import React, {useEffect, useState} from 'react'
import {Row} from 'src/components/interfaces/Row'
import {Board} from 'src/components/interfaces/Board'
import {INITIAL_BOARD, INITIAL_ROW} from 'src/components/constants/index'

const GameBoard: React.FunctionComponent = () => {
  const [board, setBoard] = useState<Board>(INITIAL_BOARD)
  useEffect(() => {
    createBoard()
  }, [])
  const createBoard = () => {
    let initialBoard: Board = INITIAL_BOARD
    for(let r: number = 0;r < 6;r++) {
      let row: Row = INITIAL_ROW
      for(let c: number = 0;c < 7;c++) {
        row.columns.push(null)
      }
      initialBoard.rows.push(row)
    }
    setBoard(initialBoard)
  }
  return (
    <div>
      
    </div>
  )
}

export default GameBoard