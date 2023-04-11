import React, { useMemo } from "react";
import { motion, MotionStyle } from "framer-motion";
import "./style.scss";

function hexToRGB(hexCode: string, alpha: number | string = 1) {
  let hex = hexCode.replace("#", "");
  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
  }
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

interface Props {
  color?: string;
  style?: MotionStyle;
}

const PulseLoading: React.FC<Props> = ({ style, color = "#313032" }) => {
  const colors = useMemo(
    () => [hexToRGB(color, 1), hexToRGB(color, 0)],
    [color]
  );

  return (
    <motion.span
      className="live"
      style={{
        ...style,
        backgroundColor: color,
      }}
      // initial={{ boxShadow: `${color} 0 0 0 0` }}
      animate={{
        boxShadow: [`${colors[0]} 0 0 0 0`, `${colors[1]} 0 0 0 16px`],
      }}
      transition={{
        repeat: Infinity,
        duration: 1,
        times: [0, 0.75],
      }}
    ></motion.span>
  );
};

export default PulseLoading;
