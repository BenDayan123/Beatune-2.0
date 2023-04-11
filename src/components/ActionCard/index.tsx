import React from "react";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  icon: any;
  title: string;
}

const ActionCard: React.FC<Props> = ({ title, icon: Icon, ...rest }) => {
  return (
    <div className="action-card" {...rest}>
      <div className="card-content">
        <div className="icon-container">
          <Icon className="icon" />
        </div>
        <h1 id="title">{title}</h1>
      </div>
    </div>
  );
};

export default ActionCard;
