import React from "react";
import { useURLQuery } from "../../../../hooks/useQuery";
import { CardSlider, Card } from "../../../Card";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { IAlbum } from "../../../../interfaces";
import SpinnerLoading from "../../../Loading/spinner";
import { useNavigate } from "react-router-dom";

export const AlbumsPage: React.FC = () => {
  const artist_id = useURLQuery("id");
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const { data: albums, isLoading } = useQuery({
    queryKey: ["artist", artist_id, "albums"],
    initialData: [],
    queryFn: () =>
      axios
        .get<IAlbum[]>(`artist/${artist_id}/albums`)
        .then(({ data }) => data),
    enabled: !!artist_id,
    onSuccess: (albums) =>
      albums.map((album) =>
        queryClient.setQueryData(["album", album._id], album)
      ),
  });

  if (isLoading) return <SpinnerLoading />;

  return (
    <CardSlider>
      {albums?.map((album: IAlbum) => {
        const { name, total_tracks, image, _id } = album;
        return (
          <Card
            onClick={() => nav(`/app/album/${_id}`)}
            imgUrl={image ?? ""}
            title={name}
            description={`${total_tracks} Tracks`}
            key={_id}
          />
        );
      })}
    </CardSlider>
  );
};
