import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { HelpOutlined, CheckCircle, GppBad, Error } from "@mui/icons-material";
import { INotification } from "../../hooks/useNotifications";
import { useNotification, ACTIONS } from "../../hooks/useNotifications";
import "./style.scss";

const icons = {
  successful: CheckCircle,
  error: GppBad,
  warning: Error,
  info: HelpOutlined,
};

const Notification: React.FC<INotification> = ({
  title,
  description,
  id,
  type,
}) => {
  const dispatch = useNotification();
  const variants = {
    animate: { opacity: 1, scale: 1, x: 0 },
    hidden: { opacity: 0, scale: 0, x: -200 },
    exit: { opacity: 0, scale: 0.4, x: -200 },
  };

  const Icon = useMemo(() => icons[type], []);

  useEffect(() => {
    setTimeout(() => {
      dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: { id } });
    }, 4000);
  }, [dispatch, id]);

  return (
    <>
      {/* <audio src={Sound} autoPlay></audio> */}
      <motion.div
        className={"notification " + type}
        initial="hidden"
        animate="animate"
        exit="exit"
        variants={variants}
        onClick={() =>
          dispatch({ type: ACTIONS.REMOVE_NOTIFICATION, payload: { id } })
        }
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 40,
        }}
      >
        <span className="line"></span>
        <div className="icon-container">
          <Icon className="icon" />
        </div>
        <h3 className="title">{title}</h3>
        <div className="info-container">
          {description && <p className="description">{description}</p>}
        </div>
      </motion.div>
    </>
  );
};

export default Notification;
