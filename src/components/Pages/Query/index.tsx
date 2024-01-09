import React from "react";
import { Row } from "../../Table";
import { useMusicPlayer, ACTIONS } from "../../../hooks/useMusicPlayer";
import { ImageShimmer } from "../../Loading/shimmer/image";
import { secondsToISOFormet } from "../../../utils/format";
import PlaylistRemove from "@mui/icons-material/PlaylistRemove";
import ErrorPage from "../Error";
import { TrackContextMenu } from "../Album/ContextMenu/track";

const Queue: React.FC = () => {
  const [musicPlayer, dispatch] = useMusicPlayer();
  const { query, currentTrack } = musicPlayer;

  if (query.length === 0)
    return (
      <ErrorPage
        title="Queue is empty"
        body="There no tracks in the queue"
        icon={PlaylistRemove}
      />
    );

  return (
    <div>
      <div className="table-container">
        {query.map((song, i) => (
          <Row
            index={i + 1}
            menu={<TrackContextMenu track={song} />}
            isActive={song._id === currentTrack?._id}
            id={song._id}
            onClick={() => {
              dispatch({
                type: ACTIONS.UPDATE,
                payload: {
                  query: query,
                  index: i,
                },
              });
            }}
            row={[
              <div className="title">
                <ImageShimmer src={song.album.small_image} />
                <p>{song.title}</p>
              </div>,
              secondsToISOFormet(song.duration / 1000),
            ]}
            key={song._id}
          />
        ))}
      </div>
    </div>
  );
};

export default Queue;
