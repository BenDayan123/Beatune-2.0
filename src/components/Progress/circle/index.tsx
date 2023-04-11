import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import "./style.scss";

interface Props {
  progress: number;
}

const circumference = 450;
const duration = 1;

export const ProgressCircle: React.FC<Props> = ({ progress }) => {
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (100 <= progress) {
      controls.start("animate");
    }
    setStrokeDashoffset(circumference - (progress / 100) * circumference);
  }, [progress]);

  return (
    <motion.div
      className="progress-container"
      variants={{ animate: { scale: [1, 0.7, 1] } }}
      transition={{ duration: duration }}
      animate={controls}
    >
      <svg className="progress-circle" viewBox="0 0 160 160">
        <motion.circle
          className="circle-bg"
          r="70"
          cx="80"
          cy="80"
          fill="transparent"
          initial={{ strokeWidth: 10 }}
          animate={controls}
          variants={{ animate: { strokeWidth: 20 } }}
          transition={{ duration: duration }}
        />
        <motion.circle
          className="progress"
          initial={{ strokeWidth: 10, fill: "#ffffff00" }}
          variants={{ animate: { strokeWidth: 20, fill: "#ffffff" } }}
          animate={controls}
          transition={{ duration: duration }}
          r="70"
          cx="80"
          cy="80"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
        <text className="circle-text" x="50%" y="50%">
          {progress}%
        </text>
      </svg>
      <div className="checked">
        <motion.svg
          fill="none"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: duration - 0.5, ease: "easeInOut" }}
        >
          <motion.path
            d="M6 12.75L9 15.75L18 6"
            stroke="#18d257"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{
              opacity: 0,
              strokeDasharray: "0 30",
              strokeDashoffset: "30",
            }}
            variants={{
              animate: {
                opacity: 1,
                strokeDasharray: "30 30",
                strokeDashoffset: "0",
              },
            }}
            animate={controls}
            transition={{
              duration: 1,
              delay: duration - 0.5,
              ease: "easeInOut",
            }}
          />
        </motion.svg>
      </div>
    </motion.div>
  );
};
