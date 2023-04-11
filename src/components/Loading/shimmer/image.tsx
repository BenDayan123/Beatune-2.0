import React, { useState } from "react";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export const ImageShimmer: React.FC<Props> = ({ className, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <>
      <img
        {...rest}
        className={`${className ? className : ""}${
          isLoading ? " shimmer-loading" : ""
        }`}
        alt=""
        onLoadStart={() => setLoading(true)}
        onLoadedData={() => setLoading(false)}
        onLoad={() => setLoading(false)}
      />
    </>
  );
};
