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
  songs: ISong[];
  description?: string;
  user: string;
}

export interface IArtist {
  _id: string;
  name: string;
  profile: string;
  backup_profile: string;
  is_verified: boolean;
  songs: ISong[];
  header: string;
  streams: string;
}

export interface ISong {
  _id: string;
  fullt_title?: string;
  artist_id: {
    _id: string;
    name: string;
  };
  duration: number;
  upload_date: string;
  view_count: number;
  like_count: number;
  url: string;
  title: string;
  title_with_featured: string;
  lyrics?: string;
  small_header_image?: string;
  header_image: string;
  small_image?: string;
  image: string;
}
