export interface IUser {
  _id: string;
  username: string;
  email: string;
  profile: string;
}
export interface IPlaylist {
  _id: string;
  name: string;
  image?: string;
  tracks: ISong[];
  description?: string;
  user: string;
}

export interface IAlbum {
  _id: string;
  name: string;
  url: string;
  image: string;
  small_image: string;
  tiny_image: string;
  release_date: Date;
  artist_id: string;
  artist?: Pick<IArtist, "_id" | "profile" | "name">;
  tracks?: ISong[];
  total_tracks: number;
}

export interface IArtist {
  _id: string;
  name: string;
  profile: string;
  is_verified: boolean;
  streams: number;
  followers: number;
  songs: ISong[];
}

export interface ISong {
  _id: string;
  artist: Pick<IArtist, "_id" | "name">;
  album: Pick<IAlbum, "_id" | "image" | "small_image">;
  duration: number;
  url: string;
  title: string;
  lyrics?: string;
  // upload_date: string;
  // view_count: number;
  // like_count: number;
}
