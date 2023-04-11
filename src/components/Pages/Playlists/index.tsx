import React, { useState } from "react";
import ActionCard from "../../ActionCard";
import AddSharpIcon from "@mui/icons-material/AddSharp";
import Backdrop from "../../Backdrop";
import PlaylistForm from "./form";
import { url } from "../../../utils/general";
import { ContextMenuWrapper, MenuItem } from "../../ContextMenu";
import { useNavigate } from "react-router-dom";
import { Card, CardSlider } from "../../Card";
import "./style.scss";
import { Delete } from "@mui/icons-material";
import { usePlaylist, usePlaylists } from "../../../api/playlist";

const PlaylistsPage: React.FC = () => {
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  const { deletePlaylist } = usePlaylist();
  const { isLoading, data: playlists } = usePlaylists();

  return (
    <CardSlider>
      <ActionCard
        title="Create a New Playlist"
        icon={AddSharpIcon}
        onClick={() => setOpen(!isOpen)}
      />
      {!isLoading &&
        playlists?.map((playlist, i) => {
          return (
            <ContextMenuWrapper
              key={i}
              items={
                <>
                  <MenuItem
                    className="delete-action"
                    onClick={() => deletePlaylist.mutate(playlist._id)}
                  >
                    <Delete /> Remove "{playlist.name}"
                  </MenuItem>
                </>
              }
            >
              <Card
                imgUrl={`${url}/media/${playlist.image}`}
                title={playlist.name}
                description={playlist.description}
                onClick={() => navigate(`/app/playlist/${playlist._id}`)}
              />
            </ContextMenuWrapper>
          );
        })}
      <Backdrop state={[isOpen, setOpen]}>
        <PlaylistForm />
      </Backdrop>
    </CardSlider>
  );
};

export default PlaylistsPage;

// import { useAuth } from "../../../hooks/useAuth";
// import { useQuery } from "react-query";
// import { IPlaylist } from "../../../interfaces";
// import axios from "axios";
