export interface searchResult {
  track_id: number;
  title: string;
  uploader_name: string;
  genre_name: string; // 이 이분 강조됨
  thumbnail_image: string;
  prompt: string; // 이 이분 강조됨
  tags: string;
  likes: number;
}
