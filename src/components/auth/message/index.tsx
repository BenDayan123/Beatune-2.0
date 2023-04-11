import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ErrorTwoToneIcon from "@mui/icons-material/ErrorTwoTone";
import "./style.scss";

interface Props {
  message: string;
  show?: boolean;
}

const variants = {
  initial: {
    y: "40px",
    opacity: 0,
  },
  animate: {
    y: "0",
    opacity: 1,
  },
  exit: {
    opacity: 0,
    y: "-20px",
  },
};

const ErrorMessage: React.FC<Props> = ({ message, show }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="error"
          className="message-container"
          variants={variants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            type: "spring",
            damping: 30,
            duration: 0.5,
            stiffness: 400,
          }}
        >
          <ErrorTwoToneIcon className="icon" />
          <p className="message">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ErrorMessage;
