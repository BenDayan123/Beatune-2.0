import React, { PropsWithChildren, useRef } from "react";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import { ImageShimmer } from "../Loading/shimmer/image";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  imgUrl: string;
  title: string;
  description?: string;
  round?: boolean;
  playIcon?: boolean;
}

export const CardSlider: React.FC<PropsWithChildren<{ title?: string }>> = ({
  children,
  title,
}) => {
  const slider = useRef<any>(null);

  function handleScrollWheel(e: React.WheelEvent<HTMLElement>) {
    e.currentTarget.scrollLeft += e.deltaY;
  }
  // function ScrollTo(pixels: number) {
  //   slider.current.scrollTo({
  //     behavior: "smooth",
  //     left: slider.current.scrollLeft + pixels,
  //   });
  // }
  return (
    <div className="card-slider-container">
      {title && <h1 className="title">{title}</h1>}
      <section ref={slider} className="card-slider" onWheel={handleScrollWheel}>
        {children}
      </section>
    </div>
  );
};

export const Card: React.FC<Props> = ({
  imgUrl,
  title,
  description,
  round = false,
  playIcon = true,
  ...rest
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.which === 13) {
      e.currentTarget.click();
    }
  };

  return (
    <article className="card" tabIndex={0} {...rest} onKeyDown={handleKeyDown}>
      <div className={"image " + (round ? "round" : "")}>
        <ImageShimmer src={imgUrl} />
        {playIcon && <PlayCircleFilledRoundedIcon className="icon" />}
      </div>
      <div className="content">
        <h1 id="title">{title}</h1>
        <p className="description">{description}</p>
      </div>
    </article>
  );
};
