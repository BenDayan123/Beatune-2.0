import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { IPlaylist } from "../../../interfaces";
import ColorfulBanner, { Shadow } from "../../Banner";
import { url } from "../../../utils/general";
import { useColor } from "../../../hooks/useColor";
import axios from "axios";
import TracksTable from "../../TracksTable";
import SpinnerLoading from "../../Loading/spinner";
import "./style.scss";

const PlaylistPage: React.FC = () => {
  const { id } = useParams();
  const header = useRef<any>(null);
  const { data, isLoading, isFetching } = useQuery<IPlaylist>(
    ["playlist", id],
    async () => {
      const { data } = await axios.get("playlist/" + id);
      return data;
    }
  );
  const { color } = useColor(`${url}/media/${data?.image}` || "", 10);

  if (isLoading || isFetching) return <SpinnerLoading />;
  const { image, name, description } = data ?? ({} as any);

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
          description: `${description} • ${data?.songs.length} songs`,
        }}
      />
      <div className="bottom-data">
        <Shadow color={color} />
        <TracksTable songs={data?.songs ?? []} />
      </div>
    </div>
  );
};

export default PlaylistPage;
