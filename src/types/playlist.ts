export interface MusicElementProps {
  image: string;
  title: string;
  like: number;
  isLiked: boolean;
  trackId: number;
  playlistId: number;
  isEdit: boolean;
}

interface TrackInfo {
  track_id: number;
  title: string;
  uploader_name: string;
  prompt: string;
  likes: number;
  likes_flag: boolean;
  thumbnail_image: string;
  track_image: string;
  track_url: string;
  has_lyrics: boolean;
  duration: number;
}

interface Pageable {
  page_number: number;
  page_size: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
}

export interface Playlist {
  tag_name: string;
  genre_name: string;
  genre_image: string;
  is_curated: boolean;
  is_follow: boolean;
  is_owner: boolean;
  is_public: boolean;
  owner_name: string;
  playlist_id: number;
  playlist_name: string;
  tracks: {
    content: TrackInfo[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    number_of_elements: number;
    pageable: Pageable;
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    total_elements: number;
    total_pages: number;
  };
}

export interface TagPlaylist {
  tag_id: number;
  tag_image: string;
  tag_name: string;
  tracks: {
    content: TrackInfo[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    number_of_elements: number;
    pageable: Pageable;
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    total_elements: number;
    total_pages: number;
  };
}

export interface GenrePlaylist {
  genre_id: number;
  genre_image: string;
  genre_name: string;
  tracks: {
    content: TrackInfo[];
    empty: boolean;
    first: boolean;
    last: boolean;
    number: number;
    number_of_elements: number;
    pageable: Pageable;
    size: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    total_elements: number;
    total_pages: number;
  };
}

export interface playlistParam {
  type: string;
  id: number;
}
