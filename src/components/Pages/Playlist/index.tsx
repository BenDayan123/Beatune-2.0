import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { IPlaylist } from "../../../interfaces";
import ColorfulBanner, { Shadow } from "../../Banner";
import { url } from "../../../utils/general";
import { useColor } from "../../../hooks/useColor";
import axios from "axios";
import TracksTable from "../../TracksTable";
import SubscriptionsIcon from "@mui/icons-material/Subscriptions";
import SpinnerLoading from "../../Loading/spinner";
import { secondsToISOFormet } from "../../../utils/format";
import { TrackContextMenu } from "../Album/ContextMenu/track";
import { ImageShimmer } from "../../Loading/shimmer/image";
import { Row } from "../../Table";
import { ACTIONS, useMusicPlayer } from "../../../hooks/useMusicPlayer";
import ErrorPage from "../Error";
import "./style.scss";

const PlaylistPage: React.FC = () => {
  const { id: playlistID } = useParams();
  const [musicPlayer, dispatch] = useMusicPlayer();
  const { currentTrack } = musicPlayer;
  const header = useRef<HTMLElement>(null);
  const { data: playlist, isLoading } = useQuery<IPlaylist>({
    queryKey: ["playlist", playlistID],
    queryFn: () => axios.get(`/playlist/${playlistID}`).then((r) => r.data),
  });
  const { color } = useColor(
    playlist?.image ? `${url}/media/${playlist?.image}` : undefined,
    10
  );

  if (isLoading || !playlist) return <SpinnerLoading />;
  const { image, name, description } = playlist;

  return (
    <div className="playlist-page">
      <ColorfulBanner
        color={color}
        headerRef={header}
        visiblePrecent={100}
        info={{
          image: `${url}/media/${image}`,
          type: "Playlist",
          title: name,
          description: `${description}`,
        }}
      />
      <div className="bottom-data">
        <Shadow color={color} />
        {playlist.tracks.length === 0 ? (
          <ErrorPage
            icon={SubscriptionsIcon}
            title="Your Playlist is Empty"
            body="Search tracks to add to this playlist"
          />
        ) : (
          <TracksTable>
            {playlist.tracks.map((track, index) => (
              <Row
                row={[
                  <div className="title">
                    <ImageShimmer src={track.album.small_image} />
                    <p>{track.title}</p>
                  </div>,
                  secondsToISOFormet(track.duration / 1000),
                ]}
                menu={<TrackContextMenu track={track} />}
                index={index + 1}
                isActive={track._id === currentTrack?._id}
                id={track._id}
                onClick={() =>
                  dispatch({
                    type: ACTIONS.UPDATE,
                    payload: {
                      query: playlist.tracks,
                      index: index,
                    },
                  })
                }
                key={track._id}
              />
            ))}
          </TracksTable>
        )}
      </div>
    </div>
  );
};

export default PlaylistPage;
