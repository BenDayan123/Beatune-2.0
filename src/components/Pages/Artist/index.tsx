import React, { useRef, useState } from "react";
import { useColor } from "../../../hooks/useColor";
import ArtistBanner, { Shadow } from "../../Banner";
import Buttons from "./buttons";
import { AlbumsPage } from "./routes";
import { Routes, Route } from "react-router-dom";
import ArtistNavBar, { RouteType } from "../../NavBar";
import axios from "axios";
import { useURLQuery } from "../../../hooks/useQuery";
import { useQuery } from "react-query";
import { IArtist } from "../../../interfaces";
import { toShortNumber } from "../../../utils/format";
import SpinnerLoading from "../../Loading/spinner";
import { MusicNote, Headset } from "@mui/icons-material";
import VerifiedIcon from "../../../assests/verified.svg";
import "./style.scss";

export function useArtist(id: string) {
  return useQuery<IArtist, Error>(["artist", id], async () => {
    const { data } = await axios.get(`/artist/${id}`);
    return data;
  });
}

const routes: RouteType[] = [
  { path: "popular", text: "Popular" },
  { path: "albums", text: "Albums" },
  { path: "songs", text: "Songs" },
  { path: "about", text: "About" },
];

const ArtistPage: React.FC = () => {
  const artist_id = useURLQuery("id");
  const { data, isSuccess } = useArtist(artist_id);
  const header = useRef<any>(null);
  const [visiblePrecent, setVisiblePrecent] = useState(100);
  const { color } = useColor(data?.profile ?? undefined, 10);

  function handleScroll(e: React.UIEvent<HTMLElement, UIEvent>) {
    const { scrollTop } = e.currentTarget;
    const { offsetHeight } = header.current;
    const precent = 100 - (scrollTop / offsetHeight) * 100;
    setVisiblePrecent(precent > 0 ? precent : 0);
  }

  if (!isSuccess) return <SpinnerLoading />;

  const { name, profile, is_verified, streams } = data;

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
                <h3>Artist</h3>
                {is_verified && <img src={VerifiedIcon} alt="verified" />}
              </>
            ),
            title: name,
            description: (
              <>
                <Headset />
                <p>{`${toShortNumber(streams)} Monthly Listeners`}</p>
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
        <Routes>
          <Route path="albums" element={<AlbumsPage />} />
          <Route path="*" element={<h1>Other</h1>} />
        </Routes>
        {/* <TracksTable songs={data.songs} /> */}
      </div>
    </section>
  );
};

export default ArtistPage;
