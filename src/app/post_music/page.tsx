/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

'use client';

import React, { useState } from 'react';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchGenres } from '@/api/genre.ts';
import { Genre, GenreData } from '@/types/genre.ts';
import { useQuery } from '@tanstack/react-query';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import uploadMymusic from '@/api/uploadmymusic.ts';
import Swal from 'sweetalert2';

const theme = createTheme({
  palette: {
    primary: {
      // 검은색
      main: '#a97dff',
      light: '#42a5f5',
      dark: '#1565c0',
      contrastText: '#fff',
    },
    secondary: {
      // 보라색
      main: '#6C26FF',
    },
  },
});

const UploadMyMusic = () => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [hasLyrics, setHasLyrics] = useState(Boolean);
  const [tags, setTags] = useState<string[]>([]);
  const [genreData, setgenreData] = useState<GenreData[]>([]);
  const [genreId, setGenreId] = useState<number | null>(null);
  const [trackImage, setTrackImage] = useState<File | null>(null);
  const [trackAudio, setTrackAudio] = useState<File | null>(null);

  const { data } = useQuery({
    queryKey: ['genres'],
    queryFn: fetchGenres,
  });

  // 받아온 데이터 세팅
  React.useEffect(() => {
    if (data) {
      setgenreData(data);
    }
  }, [data]);

  const handleGenre = (event: SelectChangeEvent) => {
    const selectedGenreId: number = parseInt(event.target.value, 10); // 문자열을 숫자로 변환
    setGenreId(selectedGenreId);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setHasLyrics(event.target.checked);
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault(); // 폼의 기본 동작을 막습니다.

    if (
      title &&
      prompt &&
      tags !== null &&
      tags.length > 0 &&
      genreId !== null &&
      trackImage !== null &&
      trackAudio !== null
    ) {
      try {
        const response = await uploadMymusic(
          title,
          prompt,
          hasLyrics,
          tags,
          genreId,
          trackImage,
          trackAudio,
        );
      } catch (error) {
        console.error('업로드 중 오류가 발생했습니다!', error);
        Swal.fire({
          title: '업로드 오류',
          text: '업로드 중 오류가 발생했습니다. 다시 시도해 주세요.',
          icon: 'error',
          confirmButtonText: '확인',
        });
      }
    } else {
      Swal.fire({
        title: '입력 오류',
        text: '모든 필드를 입력해 주세요.',
        icon: 'error',
        confirmButtonText: '확인',
      });
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <div className="h-screen w-full pl-[15%]">
        <div className="ml-[15%] mt-[2%] flex w-[70%]">
          <div className="mb-[4%] flex w-full flex-col items-center space-x-4 rounded-xl bg-[#1e1e1e] shadow-lg shadow-indigo-500/100">
            <div className="flex w-[90%] flex-col items-center border-b border-[#727272] p-[3%] text-center text-3xl text-[#A97DFF]">
              나만의 음악 등록
            </div>

            {/* 등록할 곡 제목, 프롬프트, 가사보유여부, 곡 태그, 곡 장르, 이미지 파일&오디오 파일 업로드 */}
            <form
              id="form-data"
              encType="multipart/form-data"
              className="flex h-auto w-full flex-col"
              onSubmit={handleSubmit}
            >
              <div className="flex items-center justify-center ">
                <div className="mt-[4%] flex w-[35%] justify-center space-x-8 rounded-xl p-[3%] shadow-lg shadow-neutral-400">
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex justify-center">
                      <label
                        htmlFor="file"
                        className="absolute w-[18%] rounded-xl border-2 border-purple-900 bg-purple-800 p-[0.4%] text-center text-2xl hover:bg-violet-900"
                      >
                        Upload Image
                      </label>
                      <input
                        type="file"
                        className="flex justify-center"
                        onChange={(e) => {
                          const file = e.target.files?.[0]; // null 체크를 통해 오류 방지
                          if (file) {
                            setTrackImage(file);
                          }
                        }}
                        accept="image/*"
                        required
                        style={{
                          fontWeight: 'bold',
                          opacity: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          marginBottom: '10%',
                        }}
                      />
                    </div>
                    <div className="flex justify-center">
                      <label
                        htmlFor="file"
                        className="absolute w-[18%] rounded-xl border-2 border-purple-900 bg-purple-800 p-[0.4%] text-center text-2xl hover:bg-violet-900"
                      >
                        Upload Audio
                      </label>
                      <input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files?.[0]; // null 체크를 통해 오류 방지
                          if (file) {
                            setTrackAudio(file);
                          }
                        }}
                        accept="audio/*"
                        required
                        style={{
                          fontWeight: 'bold',
                          opacity: 0,
                          display: 'flex',
                          justifyContent: 'center',
                          width: '100%',
                          marginBottom: '8%',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* 제목 */}
              <div className="mt-[5%] flex justify-center">
                <label className="p-[1%] text-lg text-[#A97DFF]">제목</label>
                <input
                  className="w-[50%] rounded-lg border-2 border-purple-950 bg-neutral-700 p-[1%] text-white outline-none"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              {/* 프롬프트 */}
              <div className="mt-[3%] flex justify-center">
                <label className="p-[1%] text-lg text-[#A97DFF] ">설명</label>
                <textarea
                  className="w-[50%] resize-none rounded-lg border-2 border-purple-950 bg-neutral-700 p-[1%] text-white outline-none"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              {/* 해시태그 선택 */}
              <div className="mt-[3%] flex justify-center">
                <label className="p-[1%] text-lg text-[#A97DFF]">태그</label>
                <input
                  className="w-[50%] rounded-lg border-2 border-purple-950 bg-neutral-700 p-[1%] text-white outline-none"
                  type="text"
                  value={tags}
                  onChange={(e) =>
                    setTags(e.target.value.split(',').map((tag) => tag.trim()))
                  }
                  required
                />
              </div>
              {/* 가사 보유여부 */}
              <div className="mt-[3%] flex justify-center">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={hasLyrics}
                      onChange={handleCheckboxChange}
                    />
                  }
                  label="가사 보유 여부"
                />
              </div>
              {/* 장르 선택 */}
              <div className="mt-[3%] flex justify-center">
                <FormControl sx={{ m: 1, width: 300 }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                    color="secondary"
                    className="text-[#a97dff]"
                  >
                    Genre
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={genreId ? String(genreId) : ''} // 선택된 장르의 genre_id 값을 사용
                    onChange={handleGenre}
                    input={<OutlinedInput label="genre" />}
                    color="secondary"
                    className="text-[#a0a0a0]"
                  >
                    {genreData.map((genre) => (
                      <MenuItem
                        key={genre.genre_id}
                        value={genre.genre_id}
                        className=""
                      >
                        {genre.genre_name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="flex h-full items-center justify-center">
                <button
                  className="bottom-[5%] p-[2%]"
                  type="submit"
                  form="test"
                  onClick={handleSubmit}
                >
                  <FileUploadRoundedIcon
                    sx={{ fontSize: 60 }}
                    color="secondary"
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadMyMusic;
