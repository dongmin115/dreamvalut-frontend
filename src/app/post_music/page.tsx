/* eslint-disable linebreak-style */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-console */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable no-unused-vars */

'use client';

import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchGenres } from '@/api/genre.ts';
import { GenreData } from '@/types/genre.ts';
import { useQuery } from '@tanstack/react-query';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import uploadMymusic from '@/api/uploadmymusic.ts';
import Swal from 'sweetalert2';
import { Button, ButtonGroup, TextField } from '@mui/material';

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

  const { data, isLoading } = useQuery({
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
  // 이미지와 오디오 미리보기를 위한 state 추가
  const [audioPreview, setAudioPreview] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // 이미지 파일이 변경될 때(업로드)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTrackImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // 오디오 파일이 변경될 때(업로드)
  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setTrackAudio(file);
      setAudioPreview(URL.createObjectURL(file));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="flex h-screen w-full items-center justify-center p-[10%]">
        <div className="bg-gray-1000 flex h-full w-full  flex-row items-center rounded-xl  shadow-lg">
          <div className="flex h-full basis-1/12 justify-center rounded-l-lg bg-black sm:basis-1/6 md:basis-1/6 lg:basis-1/5 xl:basis-1/4 2xl:basis-1/3">
            <img
              src="https://i.ibb.co/1GnSm8z/Dream-Vault-Png.png"
              alt="form_img"
              className="object-contain p-[20%]"
            />
          </div>
          {/* 등록할 곡 제목, 프롬프트, 가사보유여부, 곡 태그, 곡 장르, 이미지 파일&오디오 파일 업로드 */}
          <form
            id="form-data"
            encType="multipart/form-data"
            className="flex h-full flex-col items-center justify-between px-[5%] py-[15%] sm:basis-5/6 md:basis-5/6 lg:basis-4/5 lg:px-[5%] lg:py-[15%] xl:basis-3/4 xl:px-[8%] xl:py-[10%] 2xl:basis-2/3 2xl:px-[10%] 2xl:py-[5%]"
            onSubmit={handleSubmit}
          >
            <h1 className="text-2xl lg:text-2xl xl:text-3xl 2xl:text-4xl">
              음악을 등록해보세요
            </h1>
            <div className="flex w-full basis-1/2 flex-col space-y-4">
              <div className="flex w-full justify-between space-x-4">
                {/* 제목 */}
                <TextField
                  id="filled-basic"
                  label="곡 제목"
                  variant="outlined"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  color="secondary"
                  autoComplete="off"
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#2c2c2c83' },
                  }}
                  InputLabelProps={{
                    sx: {
                      color: '#a0a0a0', // 클릭되지 않았을 때 레이블 색상 변경
                      '&.Mui-focused': {
                        color: '#6C26FF', // 포커스 상태의 레이블 색상
                      },
                    }, // 텍스트 색상 변경
                  }}
                  className="w-full"
                />
                {/* 해시태그 선택 */}
                <TextField
                  id="filled-basic"
                  label="태그"
                  variant="outlined"
                  onChange={(e) =>
                    setTags(e.target.value.split(',').map((tag) => tag.trim()))
                  }
                  value={tags}
                  type="text"
                  color="secondary"
                  autoComplete="off"
                  InputProps={{
                    style: { color: 'white', backgroundColor: '#2c2c2c83' }, // 텍스트 색상 변경
                  }}
                  InputLabelProps={{
                    sx: {
                      color: '#a0a0a0', // 클릭되지 않았을 때 레이블 색상 변경
                      '&.Mui-focused': {
                        color: '#6C26FF', // 포커스 상태의 레이블 색상
                      },
                    }, // 텍스트 색상 변경
                  }}
                  className="w-full"
                />
                {/* 장르 선택 */}
                <FormControl sx={{ width: '50%', height: '100%' }}>
                  <InputLabel
                    id="demo-simple-select-autowidth-label"
                    color="secondary"
                    className="text-[#a0a0a0]"
                  >
                    Genre
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={genreId ? String(genreId) : ''} // 선택된 장르의 genre_id 값을 사용
                    onChange={handleGenre}
                    input={
                      <OutlinedInput
                        label="genre"
                        sx={{
                          '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6C26FF',
                          },
                          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#6C26FF',
                          },
                          backgroundColor: '#2c2c2c83',
                        }}
                      />
                    }
                    color="secondary"
                    className="text-white"
                  >
                    {!isLoading &&
                      genreData.map((genre) => (
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
              {/* 프롬프트 */}
              <TextField
                id="filled-basic"
                label="프롬프트"
                variant="filled"
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                type="text"
                color="secondary"
                autoComplete="off"
                multiline
                maxRows={10}
                InputProps={{
                  style: {
                    color: 'white',
                    backgroundColor: '#2c2c2c83',
                  }, // 텍스트 색상 변경
                }}
                InputLabelProps={{
                  sx: {
                    color: '#a0a0a0', // 클릭되지 않았을 때 레이블 색상 변경
                    '&.Mui-focused': {
                      color: '#6C26FF', // 포커스 상태의 레이블 색상
                    },
                  }, // 텍스트 색상 변경
                }}
                className="h-full w-full"
                sx={{
                  '& .MuiInputBase-root': {
                    height: '100%', // 부모 높이에 맞추기
                  },
                  '& .MuiFilledInput-root': {
                    height: '100%', // 입력 필드의 높이 설정
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start', // 텍스트의 시작 위치 조정
                  },
                }}
              />
            </div>

            <div className="flex h-[6%] w-full items-center justify-between">
              <ButtonGroup
                variant="contained"
                size="large"
                className="h-full"
                sx={{
                  '& .MuiButtonGroup-groupedContained': {
                    borderColor: '#6C26FF', // 버튼 사이의 선 색상 변경
                  },
                }}
              >
                <label htmlFor="image_file" className="h-full">
                  <Button component="span" color="secondary">
                    이미지 업로드
                  </Button>
                </label>
                <label htmlFor="music_file" className="h-full">
                  <Button component="span" color="secondary">
                    음악 업로드
                  </Button>
                </label>
              </ButtonGroup>
              <input
                id="image_file"
                type="file"
                className="hidden size-0"
                onChange={handleImageChange}
                accept="image/*"
                required
              />

              <input
                id="music_file"
                type="file"
                onChange={handleAudioChange}
                accept="audio/*"
                required
                className="hidden size-0"
              />
              {/* 업로드된 이미지 미리보기 */}
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Track preview"
                  className=" size-20 object-cover"
                />
              )}
              {/* 오디오 미리보기 추가 */}
              {audioPreview && <audio controls src={audioPreview} />}
            </div>

            {/* 가사 보유여부 */}
            <FormControlLabel
              className="mx-auto"
              control={
                <Checkbox
                  checked={hasLyrics}
                  onChange={handleCheckboxChange}
                  color="secondary"
                  sx={{
                    color: '#6C26FF', // 기본 테두리 색상
                    '&.Mui-checked': {
                      color: '#6C26FF', // 체크된 상태의 테두리 색상
                    },
                  }}
                />
              }
              label="가사 유무 여부"
            />

            <Button
              className="h-[7%] w-full bg-[#6C26FF] text-lg text-white"
              type="submit"
              form="test"
              onClick={handleSubmit}
              color="secondary"
              variant="contained"
            >
              등록하기
            </Button>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadMyMusic;
