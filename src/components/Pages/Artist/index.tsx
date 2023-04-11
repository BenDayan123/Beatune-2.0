import React, { useRef, useState } from "react";
import { useColor } from "../../../hooks/useColor";
import ArtistBanner, { Shadow } from "../../Banner";
import Buttons from "./buttons";
import ArtistNavBar, { RouteType } from "../../NavBar";
import axios from "axios";
import { useURLQuery } from "../../../hooks/useQuery";
import { useQuery } from "react-query";
import { IArtist } from "../../../interfaces";
import { toShortNumber } from "../../../utils/format";
import SpinnerLoading from "../../Loading/spinner";
import { MusicNote, Headset } from "@mui/icons-material";
import TracksTable from "../../TracksTable";
import "./style.scss";

export function useArtist(id: string) {
  return useQuery<IArtist, Error>(["artist", id], async () => {
    const { data } = await axios.get("/artist", {
      params: { id },
    });
    return data;
  });
}

const routes: RouteType[] = [
  { path: "popular", text: "Popular" },
  { path: "albums", text: "Albums" },
  { path: "songs", text: "Songs" },
  { path: "fans_like", text: "Fans also like" },
  { path: "about", text: "About" },
];

const ArtistPage: React.FC = () => {
  const artist_id = useURLQuery("id");
  const { data, isSuccess } = useArtist(artist_id);
  const header = useRef<any>(null);
  const [visiblePrecent, setVisiblePrecent] = useState(100);
  const { color } = useColor(data?.profile || "", 10);

  function handleScroll(e: React.UIEvent<HTMLElement, UIEvent>) {
    const { scrollTop } = e.currentTarget;
    const { offsetHeight } = header.current;
    const precent = 100 - (scrollTop / offsetHeight) * 100;
    setVisiblePrecent(precent > 0 ? precent : 0);
  }

  if (!isSuccess) return <SpinnerLoading />;

  const { name, streams, profile } = data;

  return (
    <section className="artist-page" onScroll={handleScroll}>
      {data && (
        <ArtistBanner
          visiblePrecent={visiblePrecent}
          headerRef={header}
          color={color}
          info={{
            image: profile,
            type: (
              <>
                <p>Artist</p>
                <MusicNote />
              </>
            ),
            title: name,
            description: (
              <>
                <Headset />
                <p>
                  {`${toShortNumber(
                    +streams.replaceAll(",", "")
                  )} Monthly Listeners`}
                </p>
              </>
            ),
          }}
        >
          <Buttons />
        </ArtistBanner>
      )}

      <ArtistNavBar routes={routes} />

      <div className="bottom-data">
        <Shadow color={color} />
        <TracksTable songs={data.songs} />
      </div>
    </section>
  );
};

export default ArtistPage;
