import React, { PropsWithChildren, ReactNode } from "react";
import Row from "./row";
import HeaderTitle from "./header";
import "./style.scss";

interface Props {
  showIndex?: boolean;
  header: (string | number | ReactNode)[];
}

const Table: React.FC<PropsWithChildren<Props>> = ({
  header,
  children,
  showIndex = false,
}) => {
  return (
    <div className="table-container">
      <HeaderTitle cells={header} showIndex={showIndex} />
      {children}
    </div>
  );
};

export { Table, Row };
