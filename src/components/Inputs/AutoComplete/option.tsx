import React from "react";

interface Props {
  query: string;
  handleSearch(query: string): void;
}

const Option: React.FC<Props> = ({ query, handleSearch }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter") {
      handleSearch(query);
    }
  };

  return (
    <li
      className="option"
      tabIndex={0}
      onKeyDown={(e) => {
        handleKeyDown(e);
      }}
      onClick={() => handleSearch(query)}
    >
      {query}
    </li>
  );
};

export default Option;
