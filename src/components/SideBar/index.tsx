import React, { memo, useEffect } from "react";
import { NavList } from "./nav";
import { NavProvider } from "./navProvider";
import Logo from "../../assests/icon.svg";
import { MenuToggle } from "../exitButton";
import { motion, useCycle, AnimatePresence } from "framer-motion";
import Logout from "./logout";
import DownloadCard from "../DownloadCard";
import { useDownloaderList } from "../../hooks/useDownloader";
import "./style.scss";

const Header: React.FC<any> = ({ toggle, isOpen }) => {
  return (
    <header className="logo-bar">
      <div className="logo-container">
        <img className="logo" src={Logo} alt="" />
        <h1 className="logo-name">Beatune 2.0</h1>
      </div>
      <MenuToggle toggle={toggle} activeState={isOpen} />
    </header>
  );
};

const SideBar: React.FC = memo(() => {
  const [isOpenMenu, toggleMenu] = useCycle(true, false);
  const [downloadsList] = useDownloaderList();

  return (
    <motion.div
      className={`side-bar ` + (!isOpenMenu ? "close" : "")}
      animate={{
        width: isOpenMenu ? "300px" : "85px",
      }}
      transition={{
        type: "spring",
        damping: 30,
        duration: 0.3,
        stiffness: 400,
      }}
    >
      <Header toggle={toggleMenu} isOpen={isOpenMenu} />
      <NavProvider>
        <NavList />
      </NavProvider>
      <AnimatePresence>
        {downloadsList.map((download) => (
          <motion.div
            exit={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1 }}
            key={download.key}
            transition={{ duration: 0.6, delay: 3 }}
          >
            <DownloadCard progress={download.percentage} name={download.name} />
          </motion.div>
        ))}
      </AnimatePresence>
      <Logout />
    </motion.div>
  );
});

export default SideBar;
