import React, { useEffect, useState } from "react";
import { Row } from "src/components/interfaces/Row";
import { Board } from "src/components/interfaces/Board";
import { INITIAL_BOARD, INITIAL_ROW } from "src/components/constants/index";
import GameRow from "src/components/GameRow";

const GameBoard: React.FunctionComponent = (): JSX.Element => {
  const [board, setBoard] = useState<Board>({ rows: [] });
  useEffect(() => {
    createBoard();
  }, []);
  const createBoard = (): void => {
    let initialBoard: Board = { rows: [] };
    for (let r: number = 0; r < 6; r++) {
      let row: Row = { columns: [] };
      for (let c: number = 0; c < 7; c++) {
        row.columns.push(null);
      }
      initialBoard.rows.push(row);
    }
    setBoard(initialBoard);
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
              <GameRow key={i} row={row} />
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default GameBoard;
