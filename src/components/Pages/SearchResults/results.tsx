import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import axios from "axios";
import { Card, CardSlider } from "../../Card";
import { ISong, IArtist, IUser, IPlaylist, IAlbum } from "../../../interfaces";
import { ACTIONS, useMusicPlayer } from "../../../hooks/useMusicPlayer";
import SpinnerLoading from "../../Loading/spinner";
import { url } from "../../../utils/general";
import ErrorPage from "../Error";
import { ContextMenuWrapper } from "../../ContextMenu";
import { TrackContextMenu } from "../Album/ContextMenu/track";

type SearchTypes = "users" | "playlists" | "artists" | "songs" | "albums";

const Results: any = () => {
  const [, dispatch] = useMusicPlayer();
  const { query, filter } = useParams();
  const nav = useNavigate();

  const { data, isLoading } = useInfiniteQuery<any>(
    ["search", query, filter],
    ({ pageParam = 0 }) =>
      axios
        .get(`search/${query}`, {
          params: {
            cursor: pageParam,
            types: filter ?? "",
            limit: 10,
          },
        })
        .then((r) => r.data),
    {
      enabled: !!query,
      getNextPageParam: (_, pages) => pages.length ?? undefined,
    }
  );

  function renderCardsByType(type: SearchTypes, data: any[]) {
    switch (type) {
      case "artists":
        return data.map((artist: IArtist) => {
          const { profile, name, _id, is_verified } = artist;
          return (
            <Card
              imgUrl={profile}
              title={name}
              key={_id}
              is_verified={is_verified}
              round
              playIcon={false}
              onClick={() => nav(`/app/home?id=${_id}`)}
            />
          );
        });
      case "songs":
        return data.map((song: ISong) => {
          const { artist, title, album, _id } = song;
          return (
            <ContextMenuWrapper items={<TrackContextMenu track={song} />}>
              <Card
                imgUrl={album.small_image}
                title={title}
                description={"by " + artist.name}
                key={_id}
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
            </ContextMenuWrapper>
          );
        });
      case "users":
        return data.map((user: IUser) => {
          const { profile, username, _id } = user;
          return (
            <Card
              imgUrl={`${url}/media/${profile}`}
              title={username}
              key={_id}
              playIcon={false}
              round
            />
          );
        });
      case "playlists":
        return data.map((playlist: IPlaylist) => {
          const { name, description, image, _id } = playlist;
          return (
            <Card
              imgUrl={`${url}/media/${image}`}
              title={name}
              description={description}
              key={_id}
            />
          );
        });
      case "albums":
        return data.map((album: IAlbum) => {
          const { name, total_tracks, image, _id } = album;
          return (
            <Card
              imgUrl={image ?? ""}
              title={name}
              onClick={() => nav(`/app/album/${_id}`)}
              description={`${total_tracks} Tracks`}
              key={_id}
            />
          );
        });
      default:
        return [];
    }
  }

  if (isLoading) return <SpinnerLoading />;
  if (!data?.pages[0])
    return (
      <ErrorPage
        icon={SearchOffIcon}
        title={`No results found for "${query}"`}
        body="Please make sure your words are spelled correctly or use less or different keywords."
      />
    );

  return data?.pages.map((page) =>
    Object.entries(page).map(([type, dataChunk]: any, chunkIndex) => (
      <CardSlider title={filter ? "" : type} key={chunkIndex}>
        {renderCardsByType(type, dataChunk)}
      </CardSlider>
    ))
  );
};

export default Results;
