import React, { PropsWithChildren, ReactNode } from "react";
import PlayCircleSharpIcon from "@mui/icons-material/PlayCircleSharp";
import Shadow from "./shadow";
import "./style.scss";

interface Props {
  visiblePrecent: number;
  headerRef: React.LegacyRef<HTMLElement>;
  color: string;
  info: {
    image: string;
    type: string | ReactNode;
    title: string;
    description: string | ReactNode;
  };
}

const ColorfulBanner: React.FC<PropsWithChildren<Props>> = ({
  children,
  visiblePrecent,
  headerRef,
  color,
  info,
}) => {
  const { title, type, description, image } = info;

  return (
    <>
      <header
        className="sticky-banner"
        style={{
          opacity: (100 - visiblePrecent) / 100,
          background: color + "70" ?? "rgba(0, 0, 0, 0.5)",
        }}
      >
        <PlayCircleSharpIcon className="play-icon" />
        <h1 className="name">{title}</h1>
      </header>

      <header
        ref={headerRef}
        className="banner"
        style={{
          background: color,
          opacity: visiblePrecent / 100,
        }}
      >
        <div className="left-side">
          <img
            alt=""
            src={image}
            className="profile undragable"
            draggable={false}
          />
          <div>
            <div className="page-type inline-icon-text">{type}</div>
            <h1 className="title">{title}</h1>
            <div className="description inline-icon-text">{description}</div>
          </div>
        </div>

        {children}
      </header>
    </>
  );
};

export { Shadow };
export default ColorfulBanner;
