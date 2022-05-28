import React, { useEffect, useState } from "react";
import { Row } from "src/components/interfaces/Row";
import { Board } from "src/components/interfaces/Board";
import { INITIAL_BOARD, INITIAL_ROW } from "src/components/constants/index";
import GameRow from "src/components/GameRow";

const GameBoard: React.FunctionComponent = (): JSX.Element => {
  const [board, setBoard] = useState<Board>({ rows: [] });
  const [currPlayer, setCurrPlayer] = useState<number>(1);
  useEffect(() => {
    createBoard();
  }, []);
  const createBoard = (): void => {
    let initialBoard: Board = { rows: [] };
    for (let r: number = 0; r < 6; r++) {
      let row: Row = { columns: [] };
      for (let c: number = 0; c < 7; c++) {
        row.columns.push({ player: null });
      }
      initialBoard.rows.push(row);
    }
    setBoard(initialBoard);
  };
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
  };
  return (
    <div>
      <div
        className="button"
        onClick={() => {
          createBoard();
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
