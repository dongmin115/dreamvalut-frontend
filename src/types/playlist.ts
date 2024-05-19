export interface MusicElementProps {
  image: string;
  title: string;
  like: number;
  isLiked: boolean;
  trackId: number;
  playlistId: string;
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
