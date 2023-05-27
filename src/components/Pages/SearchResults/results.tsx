import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useInfiniteQuery } from "react-query";
import axios from "axios";
import { Card, CardSlider } from "../../Card";
import { ISong, IArtist, IUser, IPlaylist } from "../../../interfaces";
import { ACTIONS, useMusicPlayer } from "../../../hooks/useMusicPlayer";
import SpinnerLoading from "../../Loading/spinner";
import { url } from "../../../utils/general";

type SearchTypes = "users" | "playlists" | "artists" | "songs";

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
      case "playlists":
        return data.map((playlist: IPlaylist, i) => {
          const { name, description, image } = playlist;
          return (
            <Card
              imgUrl={`${url}/media/${image}`}
              title={name}
              description={description}
              key={i}
            />
          );
        });
      default:
        return [];
    }
  }

  if (isLoading) return <SpinnerLoading />;
  return data?.pages.map((page) =>
    Object.entries(page).map(([type, dataChunk]: any, chunkIndex) => (
      <CardSlider title={filter ? "" : type} key={chunkIndex}>
        {renderCardsByType(type, dataChunk)}
      </CardSlider>
    ))
  );
};

export default Results;
