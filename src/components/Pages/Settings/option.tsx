import React, { PropsWithChildren } from "react";

interface Props {
  text: string;
  description?: string;
  desktopOnly?: boolean;
}

export const Option: React.FC<PropsWithChildren<Props>> = ({
  children,
  text,
  description,
  desktopOnly = false,
}) => {
  if (desktopOnly && !window.__TAURI_METADATA__) return <></>;
  return (
    <div className="option">
      <div className="container">
        <h3 className="text">{text}</h3>
        <p className="description">{description}</p>
      </div>
      {children}
    </div>
  );
};
