import React, { useCallback, useMemo } from "react";
import { ISong } from "../interfaces";
import { Table, Row } from "./Table";
import { ImageShimmer } from "./Loading/shimmer/image";
import AccessTimeTwoToneIcon from "@mui/icons-material/AccessTimeTwoTone";
import { useMusicPlayer, ACTIONS } from "../hooks/useMusicPlayer";
import { useDownload } from "../hooks/useDownloader";
import { url } from "../utils/general";
import {
  numberWithCommas,
  unixTimeToDateFormat,
  secondsToISOFormet,
} from "../utils/format";
import { MenuItem, MenuDivider, SubMenu } from "../components/ContextMenu";
import { PlaylistAdd, Download, Delete, CopyAll } from "@mui/icons-material";
import { usePlaylist, usePlaylists } from "../api/playlist";
import { useParams } from "react-router-dom";

interface Props {
  songs: ISong[];
}

const TracksTable: React.FC<Props> = ({ songs }) => {
  const { id: playlistID } = useParams();
  const { download } = useDownload();
  const [musicPlayer, dispatch] = useMusicPlayer();
  const { removeTracks, addTracks } = usePlaylist();
  const { data: playlists } = usePlaylists();

  const playSong = useCallback((songIndex: number) => {
    dispatch({
      type: ACTIONS.UPDATE,
      payload: {
        query: songs,
        index: songIndex,
      },
    });
  }, []);

  const rowData = useCallback(
    (song: ISong) => [
      <div className="contianer-in-line">
        <ImageShimmer src={song.small_image} />
        <p>{song.title_with_featured}</p>
      </div>,
      numberWithCommas(song.like_count),
      unixTimeToDateFormat(+song.upload_date * 1000),
      secondsToISOFormet(song.duration),
    ],
    []
  );

  return (
    <Table
      header={["title", "likes", "Date Added", <AccessTimeTwoToneIcon />]}
      showIndex
    >
      {songs.map((song, songIndex) => (
        <Row
          row={rowData(song)}
          menu={
            <>
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
            </>
          }
          index={songIndex + 1}
          isActive={song._id === musicPlayer.currSong()?._id}
          id={song._id}
          onClick={() => playSong(songIndex)}
          key={song._id}
        />
      ))}
    </Table>
  );
};

export default TracksTable;
