import React from "react";
import { motion } from "framer-motion";
import "./style.scss";

interface Props {
  waves: number;
}

const SoundWaves: React.FC<Props> = ({ waves }) => {
  return (
    <div className="soundWave-container">
      {new Array(waves).fill(null).map((_, i) => {
        return (
          <motion.div
            key={i}
            className="wave"
            style={{ left: `${i * 5}px` }}
            animate={{ height: [3, 15], opacity: [0.35, 1] }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: 0.5,
              delay: 0.2 * i,
            }}
          ></motion.div>
        );
      })}
    </div>
  );
};

export default SoundWaves;
