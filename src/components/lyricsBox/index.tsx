import React, { useMemo, useEffect } from "react";
import SpinnerLoading from "../Loading/spinner";
import { ImageShimmer } from "../Loading/shimmer/image";
import { useColor } from "../../hooks/useColor";
import { useMusicPlayer } from "../../hooks/useMusicPlayer";
import "./style.scss";

// interface Props {
//   lyrics: string;
//   image?: string;
// }

const LyricsBox: React.FC = () => {
  const [musicPlayer] = useMusicPlayer();
  const { lyrics, image } = musicPlayer.currSong();

  const [title, ...lines] = useMemo(
    () => (lyrics ? lyrics.split("\n") : ""),
    [lyrics]
  );
  const { color, isLoading } = useColor(image || "");
  const textColor = useMemo(
    () => (getLightness(color) > 125 ? "#000000" : "#ffffff"),
    [color]
  );

  function isVerse(line: string): boolean {
    return line.indexOf("[") === 0 && line.lastIndexOf("]") === line.length - 1;
  }

  function getLightness(color: string) {
    const extract = (n: number, steps: number) => (n >> steps) & 0xff;
    const rgb = parseInt(color.substring(1), 16);
    const [r, g, b] = [extract(rgb, 16), extract(rgb, 8), extract(rgb, 0)];
    return Math.round((r * 299 + g * 587 + b * 114) / 1000);
  }

  return (
    <section className="lyrics-container" style={{ background: color }}>
      {isLoading ? (
        <SpinnerLoading />
      ) : (
        <>
          <div className="image-container">
            <ImageShimmer src={image} className="undragable" />
            <p id="title" className="undragable">
              {title.replace(/Lyrics\[.+]/g, "")}
            </p>
          </div>
          <div className="lyrics">
            {lines.map((line, i) => {
              return (
                <label
                  key={i}
                  className={`${!line ? "end" : "line"} ${
                    isVerse(line) ? "verse-title" : ""
                  }`}
                  style={{
                    color: textColor,
                  }}
                >
                  {line}
                </label>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
};

export default LyricsBox;
