import React, { ReactNode } from "react";

interface Props {
  cells: (string | number | ReactNode)[];
  showIndex?: boolean;
}

const HeaderTitle: React.FC<Props> = ({ cells, showIndex = false }) => {
  return (
    <div id="top-header">
      {showIndex && <div className="cell index">#</div>}
      {cells.map((cell, i) => {
        return (
          <div className="cell" key={i}>
            {cell}
          </div>
        );
      })}
    </div>
  );
};

export default HeaderTitle;
