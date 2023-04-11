import { useQueryClient, useMutation, useQuery } from "react-query";
import { ISong, IPlaylist } from "../interfaces";
import axios from "axios";
import {
  useNotification,
  ACTIONS as NotificationActions,
} from "../hooks/useNotifications";

export const usePlaylist = () => {
  const queryClient = useQueryClient();
  const notificationDispatch = useNotification();

  const addTracks = useMutation(
    ({ playlistID, tracks }: any) => {
      return axios.post(`/playlist/${playlistID}/tracks`, { tracks });
    },
    {
      onSuccess: ({ data }, { playlistID }) => {
        notificationDispatch({
          type: NotificationActions.ADD_NOTIFICATION,
          payload: {
            type: "successful",
            title: "Song Added to the playlist!",
          },
        });
        queryClient.setQueryData(["playlist", playlistID], (old: any) => ({
          ...old,
          ...data,
        }));
      },
    }
  );
  const removeTracks = useMutation(
    ({ playlistID, tracks }: any) => {
      return axios.delete(`/playlist/${playlistID}/tracks`, {
        data: { tracks },
      });
    },
    {
      onSuccess: ({ data }, { playlistID }) => {
        queryClient.setQueryData(["playlist", playlistID], (old: any) => {
          old.songs = old.songs.filter((_: ISong, i: number) => {
            return data.deletedTracks.indexOf(i) === -1;
          });
          return old;
        });
      },
    }
  );

  const deletePlaylist = useMutation(
    (playlistID: string) => {
      return axios.delete(`/user/playlist/${playlistID}`);
    },
    {
      onSuccess: (_, playlistID) => {
        notificationDispatch({
          type: NotificationActions.ADD_NOTIFICATION,
          payload: {
            type: "successful",
            title: "Playlist deleted!",
          },
        });
        queryClient.setQueryData("playlists", (old: any) => {
          return old.filter(
            (playlist: IPlaylist) => playlist._id !== playlistID
          );
        });
      },
    }
  );

  return { removeTracks, addTracks, deletePlaylist };
};

export const usePlaylists = () => {
  return useQuery<IPlaylist[]>("playlists", async () => {
    const { data } = await axios.get("/user/playlists");
    return data;
  });
};
