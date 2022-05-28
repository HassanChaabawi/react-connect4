import React, { useState } from "react";
import {
  c4Columns,
  c4Rows
} from "src/components/constants/index";
import GameRow from "src/components/GameRow";
import { Board } from "src/components/interfaces/Board";
import { Row } from "src/components/interfaces/Row";

const GameBoard: React.FunctionComponent = (): JSX.Element => {
  const initialBoard =  {
    rows: Array(c4Rows).fill({columns: Array(c4Columns).fill({player: null})})
  };
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currPlayer, setCurrPlayer] = useState<number>(1);
 
  const updateBoard = (columnIndex: number): void => {
    let boardCopy: Board = board;
    let rowIndex: number = 0;
    for (let r: number = 5; r >= 0; r--) {
      let column = boardCopy.rows[r].columns[columnIndex].player;
      if (!column) {
        boardCopy.rows[r].columns[columnIndex].player = currPlayer;
        rowIndex = r;
        break;
      }
    }
    setBoard(boardCopy);
    setCurrPlayer(currPlayer === 1 ? 2 : 1);
    if (winCheck(rowIndex, columnIndex)) {
      setBoard(initialBoard);
      setCurrPlayer(1);
    }
  };
  const winCheck = (rowIndex: number, columnIndex: number): boolean => {
    return (
      checkHorizontal(rowIndex, columnIndex) ||
      checkVertical(rowIndex, columnIndex)
      // checkDiagonalRight(rowIndex, columnIndex)
    );
  };
  // const checkDiagonalRight = (
  //   rowIndex: number,
  //   columnIndex: number
  // ): boolean => {
  //   let row: Row = board.rows[rowIndex];

  // };
  const checkVertical = (rowIndex: number, columnIndex: number): boolean => {
    let row: Row = board.rows[rowIndex];
    let consecutiveRows: number = 0;
    for (let r: number = 0; r < c4Rows; r++) {
      if (
        board.rows[r].columns[columnIndex].player ==
        row.columns[columnIndex].player
      ) {
        consecutiveRows++;
      } else {
        consecutiveRows = 0;
      }
    }
    if (consecutiveRows >= 4) {
      return true;
    }
    return false;
  };
  const checkHorizontal = (rowIndex: number, columnIndex: number): boolean => {
    let row: Row = board.rows[rowIndex];
    let consecutiveColumns: number = 0;
    for (let c: number = 0; c < c4Columns; c++) {
      if (row.columns[c].player == row.columns[columnIndex].player) {
        consecutiveColumns++;
      } else {
        consecutiveColumns = 0;
      }
    }
    if (consecutiveColumns >= 4) {
      return true;
    }
    return false;
  };
  return (
    <div>
      <div
        className="button"
        onClick={() => {
          setBoard(initialBoard);
        }}
      >
        New Game
      </div>
      <table>
        <thead></thead>
        <tbody>
          {board.rows.map(
            (row: Row, i: number): JSX.Element => (
              <GameRow key={i} row={row} updateBoard={updateBoard} />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;
