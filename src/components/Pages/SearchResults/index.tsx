import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ErrorPage from "../Error";
import FilterNav from "../../FilterNav";
import Results from "./results";
import "./style.scss";
import { IsEmpty } from "../../../utils/general";
// import { useInView } from "react-intersection-observer";
// import {
//   ContextMenuWrapper,
//   MenuItem,
//   MenuDivider,
//   SubMenu,
// } from "../../ContextMenu";
// import { PlaylistAdd, Download, CopyAll } from "@mui/icons-material";
// import { usePlaylists, usePlaylist } from "../../../api/playlist";
// const { ref, inView } = useInView();
// const { addTracks } = usePlaylist();
// const { data: playlists } = usePlaylists();
// useEffect(() => {
//   if (inView) {
//     fetchNextPage();
//   }
// }, [inView]);

const SearchResultsPage: React.FC = () => {
  const { query } = useParams();

  return (
    <div className="search-page">
      <FilterNav baseURL={`/app/search/${query}/`} />
      <Results />
      {/* <button style={{ visibility: "hidden" }} ref={ref}></button> */}
      {/* IsEmpty(data?.pages[0]) */}
    </div>
  );
};

export default SearchResultsPage;
