import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useQueries, useQueryClient } from "react-query";
import { IAlbum, ISong } from "../../../interfaces";
import ColorfulBanner, { Shadow } from "../../Banner";
import { useColor } from "../../../hooks/useColor";
import { TrackContextMenu } from "./ContextMenu/track";
import axios from "axios";
import TracksTable from "../../TracksTable";
import SpinnerLoading from "../../Loading/spinner";
import "./style.scss";
import { Row } from "../../Table";
import { ACTIONS, useMusicPlayer } from "../../../hooks/useMusicPlayer";
import { ImageShimmer } from "../../Loading/shimmer/image";
import { secondsToISOFormet } from "../../../utils/format";

const AlbumPage: React.FC = () => {
  const { id: albumID } = useParams();
  const header = useRef<HTMLElement>(null);
  const [musicPlayer, dispatch] = useMusicPlayer();
  const { currentTrack } = musicPlayer;
  const queryClient = useQueryClient();
  const [albumQuery, tracksQuery] = useQueries([
    {
      queryKey: ["album", albumID],
      queryFn: () =>
        axios.get<IAlbum>(`/albums/${albumID}`).then((r) => r.data),
      enabled: !!albumID,
    },
    {
      queryKey: ["album", albumID, "tracks"],
      queryFn: () =>
        axios.get<ISong[]>(`/albums/${albumID}/tracks`).then((r) => r.data),
      enabled: !!albumID,
      initialData: [],
      onSuccess: (tracks: ISong[]) =>
        tracks.map((track) =>
          queryClient.setQueryData(["track", track._id], track)
        ),
    },
  ]);
  const { data: album } = albumQuery;
  const { color } = useColor(album?.image || undefined, 12);

  if (albumQuery.isLoading) return <SpinnerLoading />;

  const { image, name } = album ?? ({} as any);

  return (
    <div className="playlist-page">
      <ColorfulBanner
        color={color}
        headerRef={header}
        visiblePrecent={100}
        info={{
          image: image,
          type: "Album",
          title: name,
          description: `${album?.artist?.name} • ${album?.total_tracks} tracks`,
        }}
      />
      <div className="bottom-data">
        <Shadow color={color} />
        {tracksQuery.isLoading || !tracksQuery.data ? (
          <SpinnerLoading />
        ) : (
          <TracksTable>
            {tracksQuery?.data.map((song, songIndex) => (
              <Row
                row={[
                  <div className="title">
                    <ImageShimmer src={song.album.small_image} />
                    <p>{song.title}</p>
                  </div>,
                  secondsToISOFormet(song.duration / 1000),
                ]}
                menu={<TrackContextMenu track={song} />}
                index={songIndex + 1}
                isActive={song._id === currentTrack?._id}
                id={song._id}
                onClick={() =>
                  dispatch({
                    type: ACTIONS.UPDATE,
                    payload: {
                      query: tracksQuery.data,
                      index: songIndex,
                    },
                  })
                }
                key={song._id}
              />
            ))}
          </TracksTable>
        )}
      </div>
    </div>
  );
};

export default AlbumPage;
