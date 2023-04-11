import React, { PropsWithChildren } from "react";
import { generateUUID } from "../../utils/general";
import { IGroup, NavGroup } from "./navItem";
import { useNav } from "./navProvider";

export type INav = IGroup[];

export const NavList: React.FC<PropsWithChildren<any>> = () => {
  const [nav] = useNav();

  return (
    <div className="nav-list">
      {nav.map((group) => (
        <NavGroup {...group} key={generateUUID()} />
      ))}
    </div>
  );
};
