import React, { useContext, PropsWithChildren, useState } from "react";
import { INav } from "./nav";
import {
  CottageTwoTone,
  ManageSearchTwoTone,
  SettingsInputAntennaTwoTone,
  HistoryToggleOffTwoTone,
  FavoriteTwoTone,
  AccountCircleTwoTone,
  LibraryMusicTwoTone,
  QueueMusicTwoTone,
} from "@mui/icons-material";

const navList: INav = [
  {
    items: [
      {
        title: "Home",
        path: "home" + "/songs?id=62bb43392490d59b55225ba1",
        icon: CottageTwoTone,
      },
      { title: "Browse", path: "search", icon: ManageSearchTwoTone },
      { title: "Radio", path: "radio", icon: SettingsInputAntennaTwoTone },
    ],
  },
  {
    label: "Your Library",
    togglable: true,
    items: [
      {
        title: "Recently Played",
        path: "recn_plays",
        icon: HistoryToggleOffTwoTone,
      },
      {
        title: "Favorite Songs",
        path: "fav_songs",
        icon: FavoriteTwoTone,
      },
      { title: "Artists", path: "artists", icon: AccountCircleTwoTone },
      { title: "Playlists", path: "playlist", icon: QueueMusicTwoTone },
    ],
  },
  {
    label: "Others",
    togglable: true,
    items: [
      {
        title: "Recently Played",
        path: "recn_plays1",
        icon: HistoryToggleOffTwoTone,
      },
      {
        title: "Favorite Songs",
        path: "fav_songs1",
        icon: FavoriteTwoTone,
      },
      { title: "Artists", path: "artists1", icon: AccountCircleTwoTone },
      { title: "Albums", path: "albums1", icon: LibraryMusicTwoTone },
    ],
  },
];

type ContextState = [INav];

const NavContext = React.createContext<ContextState>({} as ContextState);

export function useNav() {
  return useContext(NavContext);
}

export const NavProvider: React.FC<PropsWithChildren<any>> = ({ children }) => {
  const [nav] = useState(navList);

  return <NavContext.Provider value={[nav]}>{children}</NavContext.Provider>;
};
