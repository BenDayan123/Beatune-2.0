import React from "react";
import { MenuItem, MenuDivider, SubMenu } from "../../../ContextMenu";
import { PlaylistAdd, Download, CopyAll, Add } from "@mui/icons-material";
import { usePlaylist, usePlaylists } from "../../../../api/playlist";
import { url } from "../../../../utils/general";
import { useDownload } from "../../../../hooks/useDownloader";
import { ACTIONS, useMusicPlayer } from "../../../../hooks/useMusicPlayer";
import { ISong } from "../../../../interfaces";
import { useNavigate } from "react-router-dom";

interface Props {
  track: ISong;
}

export const TrackContextMenu: React.FC<Props> = ({ track }) => {
  const { addTracks } = usePlaylist();
  const { data: playlists } = usePlaylists();
  const { download } = useDownload();
  const nav = useNavigate();
  const [, dispatch] = useMusicPlayer();

  return (
    <>
      <MenuItem
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_TO_END,
            payload: { track },
          })
        }
      >
        <PlaylistAdd /> Push To End
      </MenuItem>
      <MenuItem
        onClick={() =>
          dispatch({
            type: ACTIONS.ADD_NEXT,
            payload: { track },
          })
        }
      >
        <PlaylistAdd /> Add Next
      </MenuItem>
      <SubMenu
        label={
          <>
            <PlaylistAdd />
            Add To playlist
          </>
        }
      >
        <MenuItem onClick={() => nav("/app/playlist")}>
          <Add />
          Create Playlist
        </MenuItem>
        {playlists?.map((playlist, i) => (
          <MenuItem
            key={i}
            onClick={() =>
              addTracks.mutate({
                tracks: [track._id],
                playlistID: playlist._id,
              })
            }
          >
            <img src={`${url}/media/${playlist.image}`} />
            {playlist.name}
          </MenuItem>
        ))}
      </SubMenu>
      <MenuDivider />
      <MenuItem onClick={() => navigator.clipboard.writeText(track._id)}>
        <CopyAll /> Copy ID
      </MenuItem>
      {window.__TAURI_METADATA__ && (
        <MenuItem
          onClick={() => {
            download(track);
          }}
        >
          <Download /> Download
        </MenuItem>
      )}
    </>
  );
};
