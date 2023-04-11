import React, { useState, PropsWithChildren, useEffect } from "react";
import "./style.scss";

interface Props
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const RippleButton: React.FC<PropsWithChildren<Props>> = ({
  children,
  onClick,
  className,
  ...rest
}) => {
  const [coords, setCoords] = useState({ x: -1, y: -1, d: -1 });
  const [isRipple, setIsRippling] = useState(false);

  useEffect(() => {
    if (coords.x !== -1 && coords.y !== -1) {
      setIsRippling(true);
      setTimeout(() => setIsRippling(false), 300);
    } else setIsRippling(false);
  }, [coords]);

  useEffect(() => {
    !isRipple && setCoords({ x: -1, y: -1, d: -1 });
  }, [isRipple]);

  return (
    <button
      {...rest}
      className={"ripple-button " + className}
      onClick={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setCoords({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          d: Math.max(e.clientX, e.clientY),
        });
        onClick && onClick(e);
      }}
    >
      {isRipple && (
        <span
          className="ripple"
          style={{
            width: coords.d,
            height: coords.d,
            left: coords.x - coords.d / 2,
            top: coords.y - coords.d / 2,
          }}
        />
      )}
      {children}
      {/* <span className="content">{children}</span> */}
    </button>
  );
};

export default RippleButton;
