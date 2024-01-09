import React, { PropsWithChildren, useCallback } from "react";
import { Table } from "./Table";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";

const TracksTable: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Table
      // header={["title", "likes", "Date Added", <AccessTimeTwoToneIcon />]}
      header={["title", <AccessTimeTwoToneIcon />]}
      showIndex
    >
      {children}
    </Table>
  );
};

export default TracksTable;
{
  /* <>
<MenuItem>
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
  {playlists?.map((playlist, i) => (
    <MenuItem
      key={i}
      onClick={() =>
        addTracks.mutate({
          tracks: [song._id],
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
<MenuItem onClick={() => navigator.clipboard.writeText(song._id)}>
  <CopyAll /> Copy ID
</MenuItem>
<MenuItem
  onClick={() => {
    download(`song/${song._id}/audio`);
  }}
>
  <Download /> Download
</MenuItem>
<MenuItem
  className="delete-action"
  onClick={() =>
    removeTracks.mutate({
      tracks: [songIndex],
      playlistID: playlistID,
    })
  }
>
  <Delete /> Remove From Playlist
</MenuItem>
</> */
}
