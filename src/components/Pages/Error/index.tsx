import React from "react";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import "./style.scss";

interface Props {
  query: string;
}

const ErrorPage: React.FC<Props> = ({ query }) => {
  return (
    <section className="error-page">
      <SearchOffIcon className="icon" />
      <h1 id="title">No results found for "{query}"</h1>
      <p className="text">
        Please make sure your words are spelled correctly or use less or
        different keywords.
      </p>
    </section>
  );
};

export default ErrorPage;
