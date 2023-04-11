import React from "react";
import { Row } from "../../Table";
import { useMusicPlayer } from "../../../hooks/useMusicPlayer";
import { ImageShimmer } from "../../Loading/shimmer/image";
import { secondsToISOFormet } from "../../../utils/format";

const Queue: React.FC = () => {
  const [musicPlayer] = useMusicPlayer();
  const { query } = musicPlayer;
  return (
    <>
      <h1>Queue</h1>
      <div className="table-container">
        {query.map((song, i) => (
          <Row
            index={i + 1}
            isActive={song._id === musicPlayer.currSong()?._id}
            id={song._id}
            row={[
              <div className="contianer-in-line">
                <ImageShimmer src={song.small_image} />
                <p>{song.title}</p>
              </div>,
              secondsToISOFormet(song.duration),
            ]}
            key={song._id}
          />
        ))}
      </div>
    </>
  );
};

export default Queue;