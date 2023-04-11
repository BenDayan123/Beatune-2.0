import React, { useEffect, useRef } from "react";
import { NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { RouteType } from "./";

interface Props {
  link: RouteType;
  setIndex: any;
}

const NavItem: React.FC<Props> = ({ link, setIndex }) => {
  const ref = useRef<any>();
  const url = useResolvedPath(link.path).pathname;
  const match = useMatch({
    path: url,
  });

  useEffect(() => {
    Boolean(match) && setIndex(ref.current);
  }, [match]);

  return (
    <NavLink
      ref={ref}
      end
      to={link.path + window.location.search}
      className={({ isActive }) => "link" + (isActive ? " active" : "")}
    >
      {link.text}
    </NavLink>
  );
};

export default NavItem;
