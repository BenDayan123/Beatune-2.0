import React, { PropsWithChildren, useContext, createContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./style.scss";

type ContextType = [boolean, React.Dispatch<React.SetStateAction<boolean>>];
interface Props {
  state: ContextType;
  showRotate?: boolean;
  borderRadius?: string;
  fullscreen?: boolean;
}

const BackdropContext = createContext<ContextType>({} as ContextType);

export function useOpenState() {
  return useContext(BackdropContext);
}

const Backdrop: React.FC<PropsWithChildren<Props>> = ({
  children,
  state,
  showRotate = true,
  fullscreen = false,
  borderRadius = "2em",
}) => {
  const [isOpen, setOpen] = state;
  return (
    <AnimatePresence exitBeforeEnter>
      {isOpen && (
        <motion.div
          className="backdrop-overlay"
          style={{ position: fullscreen ? "absolute" : "fixed" }}
          onClick={() => setOpen(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{
            delay: 0,
            duration: 0.2,
            ease: "easeInOut",
          }}
        >
          {showRotate && (
            <motion.div
              className="rotated"
              style={{ borderRadius }}
              initial={{ skewY: "0deg", rotate: "0deg" }}
              animate={{ skewY: "-5deg", rotate: "-5deg" }}
              exit={{ skewY: "0deg", rotate: "0deg" }}
              transition={{
                delay: 0.2,
                type: "spring",
                damping: 25,
                duration: 0.5,
                stiffness: 500,
              }}
            ></motion.div>
          )}
          <BackdropContext.Provider value={[isOpen, setOpen]}>
            <div
              className="content"
              style={{
                borderRadius,
                width: fullscreen ? "100%" : "500px",
                height: fullscreen ? "100%" : "350px",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </div>
          </BackdropContext.Provider>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Backdrop;
