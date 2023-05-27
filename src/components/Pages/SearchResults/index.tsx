import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import ErrorPage from "../Error";
import FilterNav from "../../FilterNav";
import Results from "./results";
import "./style.scss";
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
  const { query, filter } = useParams();
  const { isError } = useQuery(["search", query, filter]);
  return (
    <div className="search-page">
      <FilterNav baseURL={`/app/search/${query}/`} />
      {isError ? <ErrorPage query={query ?? ""} /> : <Results />}

      {/* <CardSlider title="Songs">
        {data?.pages.map((page, i) => (
          <React.Fragment key={i}>

            {page.map((song) => {
              const { title, small_image, _id, artist_id } = song;
              return (
                <ContextMenuWrapper
                  key={_id}
                  items={
                    <>
                      <MenuItem>
                        <PlaylistAdd /> Add Next
                      </MenuItem>
                      <SubMenu
                        label={
                          <>
                            <PlaylistAdd />
                            Add To playlist
                          </>
                        }
                      >
                        {playlists?.map((playlist, i) => (
                          <MenuItem
                            key={i}
                            onClick={() =>
                              addTracks.mutate({
                                tracks: [song._id],
                                playlistID: playlist._id,
                              })
                            }
                          >
                            <img
                              src={`http://localhost:4000/media/${playlist.image}`}
                            />
                            {playlist.name}
                          </MenuItem>
                        ))}
                      </SubMenu>
                      <MenuDivider />
                      <MenuItem
                        onClick={() => navigator.clipboard.writeText(song._id)}
                      >
                        <CopyAll /> Copy ID
                      </MenuItem>
                      <MenuItem>
                        <Download /> Download
                      </MenuItem>
                    </>
                  }
                >
               
                </ContextMenuWrapper>
              );
            })}
        ))}
      </CardSlider> */}
      {/* <button style={{ visibility: "hidden" }} ref={ref}></button> */}
      {/* IsEmpty(data?.pages[0]) */}
    </div>
  );
};

export default SearchResultsPage;
