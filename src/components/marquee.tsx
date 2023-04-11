import React, { PropsWithChildren, useState } from "react";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {}

export const MarqueeOverflow: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...rest
}) => {
  const [isOverflow, setOverflow] = useState(false);

  function isElementOverflowing(element: any) {
    var overflowX = element.offsetWidth < element.scrollWidth,
      overflowY = element.offsetHeight < element.scrollHeight;

    return overflowX || overflowY;
  }
  return <p></p>;
};
