import React, { ReactNode } from "react";
import IndexCell from "./indexCell";
import { ContextMenuWrapper } from "../ContextMenu";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  row: (string | number | ReactNode)[];
  id: string;
  isActive?: boolean;
  index: number | null;
  menu?: React.ReactNode;
}

const Row: React.FC<Props> = ({ row, index, id, isActive, menu, ...props }) => {
  const { className, ...rest } = props;

  return (
    <ContextMenuWrapper
      {...rest}
      className={`row${isActive ? " active" : ""} ${className || ""}`}
      id={id}
      items={menu}
    >
      <IndexCell index={index} isActive={isActive} />
      {row.map((cell, i) => {
        return (
          <div className="cell" key={i}>
            {cell}
          </div>
        );
      })}
    </ContextMenuWrapper>
  );
};

export default Row;
