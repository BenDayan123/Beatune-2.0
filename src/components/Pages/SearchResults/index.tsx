import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Card, CardSlider } from "../../Card";
import { ISong, IArtist, IUser } from "../../../interfaces";
import { useMusicPlayer, ACTIONS } from "../../../hooks/useMusicPlayer";
import ErrorPage from "../Error";
import FilterNav from "../../FilterNav";
import SpinnerLoading from "../../Loading/spinner";
import { url, IsEmpty } from "../../../utils/general";
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

type SearchTypes = "users" | "playlists" | "artists" | "songs";

const SearchResultsPage: React.FC = () => {
  const [, dispatch] = useMusicPlayer();
  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const { query } = useParams();
  const types = searchParams.get("types");

  const { data, isLoading, fetchNextPage } = useInfiniteQuery<any>(
    ["search", query, types],
    ({ pageParam = 0 }) =>
      axios
        .get(`search/${query}`, {
          params: {
            cursor: pageParam,
            types: types ?? "",
            limit: 20,
          },
        })
        .then((res) => res.data),
    {
      enabled: !!query,
      getNextPageParam: (_, pages) => pages.length ?? undefined,
    }
  );

  function renderCardsByType(type: SearchTypes, data: any[]) {
    switch (type) {
      case "artists":
        return data.map((artist: IArtist, i) => {
          const { profile, name, _id } = artist;
          return (
            <Card
              imgUrl={profile || ""}
              title={name + " ♪"}
              key={i}
              round
              onClick={() => nav(`/app/home?id=${_id}`)}
            />
          );
        });
      case "songs":
        return data.map((song: ISong, i) => {
          const { small_image, title, artist_id } = song;
          return (
            <Card
              imgUrl={small_image || ""}
              title={title}
              description={"by " + artist_id.name}
              key={i}
              onClick={() => {
                dispatch({
                  type: ACTIONS.UPDATE,
                  payload: {
                    query: [song],
                    index: 0,
                  },
                });
              }}
            />
          );
        });
      case "users":
        return data.map((user: IUser, i) => {
          const { profile, username } = user;
          return (
            <Card
              imgUrl={`${url}/media/${profile}`}
              title={username}
              key={i}
              playIcon={false}
              round
            />
          );
        });
      default:
        return [];
    }
  }

  if (isLoading) return <SpinnerLoading />;

  if (IsEmpty(data?.pages[0])) return <ErrorPage query={query ?? ""} />;

  return (
    <div className="search-page">
      <FilterNav
        setFilter={(filter) =>
          nav({
            pathname: ".",
            search: `types=${filter}`,
          })
        }
      />

      {data?.pages.map((page) =>
        Object.entries(page).map(([type, dataChunk]: any, chunkIndex) => (
          <CardSlider title={type} key={chunkIndex}>
            {renderCardsByType(type, dataChunk)}
          </CardSlider>
        ))
      )}

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
    </div>
  );
};

export default SearchResultsPage;
