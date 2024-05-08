/* eslint-disable semi */
export interface Genre {
  genre_id: number;
  genre_name: string;
}

export interface Tag {
  tag_id: number;
  tag_name: string;
}

export interface TrackInfo {
  id: number;
  title: string;
  uploader_name: string;
  prompt: string;
  track_genre: Genre;
  track_tags: Tag[];
  likes: number;
  likes_flag: boolean;
  thumbnail_image: string;
}

export interface SortInfo {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

export interface Pageable {
  page_number: number;
  page_size: number;
  sort: SortInfo;
  offset: number;
  unpaged: boolean;
  paged: boolean;
}

export interface searchResult {
  content: TrackInfo[];
  pageable: Pageable;
  total_elements: number;
  total_pages: number;
  last: boolean;
  size: number;
  number: number;
  sort: SortInfo;
  first: boolean;
  number_of_elements: number;
  empty: boolean;
}
