import React, { useState } from "react";
import { c4Columns, c4Rows } from "src/components/constants/index";
import GameRow from "src/components/GameRow";
import { Board } from "src/components/interfaces/Board";
import { Row } from "src/components/interfaces/Row";
import { Column } from "src/components/interfaces/Column";

const GameBoard: React.FunctionComponent = (): JSX.Element => {
  const initialBoard: Board = {
    rows: Array.from({ length: c4Rows }, (_, i) => ({
      columns: Array.from({ length: c4Columns }, (_, i) => ({ player: null })),
    })),
  };
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currPlayer, setCurrPlayer] = useState<number>(1);

  const updateBoard = (columnIndex: number): void => {
    let boardCopy: Board = board;
    let rowIndex: number = 0;
    let areColumnsFull = true;
    for (let r: number = 5; r >= 0; r--) {
      let columnPlayer = boardCopy.rows[r].columns[columnIndex].player;
      if (!columnPlayer) {
        boardCopy.rows[r].columns[columnIndex].player = currPlayer;
        rowIndex = r;
        areColumnsFull = false;
        break;
      }
    }
    if (!areColumnsFull) {
      setBoard(boardCopy);
      setCurrPlayer(currPlayer === 1 ? 2 : 1);
    }
    if (winCheck(rowIndex, columnIndex)) {
      setBoard(initialBoard);
      alert("player " + currPlayer + " wins");
      setCurrPlayer(1);
    } else {
      if (drawCheck()) {
        setBoard(initialBoard);
        alert("Draw");
        setCurrPlayer(1);
      }
    }
  };
  const drawCheck = (): boolean => {
    let isBoardFilled: boolean =
      board.rows.filter(
        (row: Row) =>
          row.columns.filter((column: Column) => column.player === null)
            .length > 0
      ).length > 0
        ? false
        : true;
    return isBoardFilled;
  };
  const winCheck = (rowIndex: number, columnIndex: number): boolean => {
    return (
      checkHorizontal(rowIndex, columnIndex) ||
      checkVertical(rowIndex, columnIndex) ||
      checkDiagonalRight(rowIndex, columnIndex) ||
      checkDiagonalLeft(rowIndex, columnIndex)
    );
  };
  const checkDiagonalLeft = (
    rowIndex: number,
    columnIndex: number
  ): boolean => {
    let columnToStartFrom: number = columnIndex;
    let consecutiveTiles: number = 0;
    let rowToStartFrom: number = rowIndex;
    for (let i: number = 0; i < c4Rows; i++) {
      let column: Column = board.rows[rowIndex - i]?.columns[columnIndex + i];
      if (column) {
        columnToStartFrom = columnIndex + i;
        rowToStartFrom = rowIndex - i;
      } else {
        break;
      }
    }
    for (let j: number = 0; j < c4Rows; j++) {
      let column: Column =
        board.rows[rowToStartFrom + j]?.columns[columnToStartFrom - j];
      if (column) {
        if (
          column.player === board.rows[rowIndex].columns[columnIndex].player
        ) {
          consecutiveTiles++;
          if (consecutiveTiles >= 4) {
            return true;
          }
        } else {
          consecutiveTiles = 0;
        }
      }
    }
    return false;
  };
  const checkDiagonalRight = (
    rowIndex: number,
    columnIndex: number
  ): boolean => {
    let consecutiveTiles: number = 0;
    let indexDifference: number = rowIndex - columnIndex;
    let rowToStartFrom: number = 0;
    let columnToStartFrom: number = 0;
    if (indexDifference > 0) {
      rowToStartFrom = indexDifference;
    } else if (indexDifference !== 0) {
      columnToStartFrom = Math.abs(indexDifference);
    }
    for (let i: number = 0; i < c4Rows; i++) {
      let column =
        board.rows[rowToStartFrom + i]?.columns[columnToStartFrom + i];
      if (column) {
        if (
          column.player === board.rows[rowIndex].columns[columnIndex].player
        ) {
          consecutiveTiles++;
          if (consecutiveTiles >= 4) {
            return true;
          }
        } else {
          consecutiveTiles = 0;
        }
      }
    }
    return false;
  };
  const checkVertical = (rowIndex: number, columnIndex: number): boolean => {
    let row: Row = board.rows[rowIndex];
    let consecutiveRows: number = 0;
    for (let r: number = 0; r < c4Rows; r++) {
      if (
        board.rows[r].columns[columnIndex].player ===
        row.columns[columnIndex].player
      ) {
        consecutiveRows++;
        if (consecutiveRows >= 4) {
          return true;
        }
      } else {
        consecutiveRows = 0;
      }
    }
    return false;
  };
  const checkHorizontal = (rowIndex: number, columnIndex: number): boolean => {
    let row: Row = board.rows[rowIndex];
    let consecutiveColumns: number = 0;
    for (let c: number = 0; c < c4Columns; c++) {
      if (row.columns[c].player === row.columns[columnIndex].player) {
        consecutiveColumns++;
        if (consecutiveColumns >= 4) {
          return true;
        }
      } else {
        consecutiveColumns = 0;
      }
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
