export interface GenreData {
  // 장르 데이터의 형식을 정의하는 TypeScript 인터페이스입니다.
  genre_id: number;
  genre_name: string;
  genre_image: string;
}

// 선택한 장르와 선택된 장르를 변경하는 함수
export interface Genre {
  genre_id: number;
  genre_name: string;
  state: boolean;
}

// 메인 페이지에서 장르를 선택하고 선택된 장르의 props (진우)
export interface GenreMusicProps {
  genre: string;
  bgColor: number;
  musicImage1: string;
  musicImage2: string;
  musicImage3: string;
  musicTitle1: string;
  musicTitle2: string;
  musicTitle3: string;
}
