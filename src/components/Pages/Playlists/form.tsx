import React, { useState } from "react";
import { Input } from "../../Inputs/Input";
import { ImageInput } from "../../Inputs/Image";
import RippleButton from "../../RippleButton";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useOpenState } from "../../Backdrop";
import { useNotification, ACTIONS } from "../../../hooks/useNotifications";
import Image from "../../../assests/default.jpg";

const PlaylistForm: React.FC = () => {
  const notificationDispatch = useNotification();
  const [, setOpen] = useOpenState();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState("");
  const [profile, setProfile] = useState<File>(new File([""], "filename"));
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (form: FormData) => {
      return axios.post("/playlist/create", form);
    },
    {
      onSuccess: ({ data: newPlayist }) => {
        notificationDispatch({
          type: ACTIONS.ADD_NOTIFICATION,
          payload: {
            type: "successful",
            title: "Success!",
            description: `Playlist "${newPlayist.name}" created successfully`,
          },
        });
        queryClient.setQueryData("playlists", (playlists: any) => [
          ...playlists,
          newPlayist,
        ]);
        setOpen(false);
      },
      onError: (e) => {
        notificationDispatch({
          type: ACTIONS.ADD_NOTIFICATION,
          payload: {
            type: "error",
            title: "Error for playlist",
            description: "There was a problem creating the playlist.",
          },
        });
      },
    }
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    mutation.mutate(form);
  }

  return (
    <div className="form-container">
      <h1>Create a playlist</h1>
      <form
        className="playlist-form"
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <ImageInput
          state={[profile, setProfile]}
          input={{ name: "image" }}
          defaultImage={Image}
        />
        <Input
          labelText="Name"
          state={[name, setName]}
          type="text"
          name="name"
          required={true}
        />
        <Input
          labelText="Description"
          state={[description, setDescription]}
          type="text"
          name="description"
          required={true}
        />
        <RippleButton className="submit-button" type="submit">
          Create
        </RippleButton>
      </form>
    </div>
  );
};

export default PlaylistForm;
