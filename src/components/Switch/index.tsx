import React from "react";
import { motion } from "framer-motion";
import "./style.scss";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  isOn: boolean;
}

const spring = {
  type: "spring",
  stiffness: 700,
  duration: 0.4,
  damping: 30,
};

const Switch: React.FC<Props> = ({ isOn, ...props }) => {
  return (
    <div className={`switch ${isOn ? "on" : "off"}`} tabIndex={0} {...props}>
      <motion.div
        layout
        // transition={spring}
        className="thumb"
        // whileHover={{ filter: " brightness(95%)" }}
      />
    </div>
  );
};

export default Switch;
