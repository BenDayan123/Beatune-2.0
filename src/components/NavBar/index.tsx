import React, { useState } from "react";
import { motion } from "framer-motion";
import NavItem from "./item";
import "./style.scss";

export type RouteType = {
  path: string;
  text: string;
};

interface Props {
  routes: RouteType[];
}

const NavBar: React.FC<Props> = ({ routes }) => {
  const [index, setIndex] = useState<(EventTarget & HTMLAnchorElement) | null>(
    null
  );

  return (
    <nav className="navbar-container">
      <div className="links">
        {routes.map((route, i) => (
          <NavItem setIndex={setIndex} link={route} key={i} />
        ))}

        {index && (
          <motion.span
            className="line"
            animate={{
              left: index.offsetLeft + index.offsetWidth / 2,
            }}
          ></motion.span>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
