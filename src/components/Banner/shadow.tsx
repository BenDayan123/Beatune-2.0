import React from "react";

interface Props {
  color: string;
}

const Shadow: React.FC<Props> = ({ color }) => {
  return (
    <div
      className="top-shadow"
      style={{
        backgroundImage: `linear-gradient(to bottom,${color}60,transparent 100%)`,
      }}
    ></div>
  );
};

export default Shadow;
