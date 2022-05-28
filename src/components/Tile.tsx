import React from "react";
import { Column } from "src/components/interfaces/Column";

interface Props {
  columnIndex: number;
  column: Column;
}

const Tile: React.FunctionComponent<Props> = ({
  columnIndex,
  column,
}: Props): JSX.Element => {
  let tileStatus = "open";

  if (column === 1) {
    tileStatus = "player1";
  } else if (column === 2) {
    tileStatus = "player2";
  }

  return (
    <td>
      <div className="tile">
        <div className={[tileStatus, "circle"].join(" ")}></div>
      </div>
    </td>
  );
};
export default Tile;
