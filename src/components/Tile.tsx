import React from "react";
import { Column } from "src/components/interfaces/Column";

interface Props {
  columnIndex: number;
  column: Column;
  updateBoard: (columnIndex: number) => void;
}

const Tile: React.FunctionComponent<Props> = ({
  columnIndex,
  updateBoard,
  column,
}: Props): JSX.Element => {
  let tileStatus = "open";

  if (column.player === 1) {
    tileStatus = "player1";
  } else if (column.player === 2) {
    tileStatus = "player2";
  }

  return (
    <td>
      <div className="tile" onClick={() => updateBoard(columnIndex)}>
        <div className={[tileStatus, "circle"].join(" ")}></div>
      </div>
    </td>
  );
};
export default Tile;
