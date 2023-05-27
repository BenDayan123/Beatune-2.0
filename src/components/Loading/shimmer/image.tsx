import React, { useState } from "react";
import classNames from "classnames";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {}

export const ImageShimmer: React.FC<Props> = ({ className, ...rest }) => {
  const [isLoading, setLoading] = useState(true);
  return (
    <img
      className={classNames(className, { loading: isLoading })}
      alt=""
      {...rest}
      onLoadStart={() => setLoading(true)}
      onLoadedData={() => setLoading(false)}
      onLoad={() => setLoading(false)}
    />
  );
};
