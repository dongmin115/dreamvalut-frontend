/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable operator-linebreak */
/* eslint-disable max-len */
/* eslint-disable no-shadow */
/* eslint-disable import/order */
/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import React, { useState, useEffect } from 'react';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import {
  createTheme,
  ThemeProvider,
  Theme,
  useTheme,
} from '@mui/material/styles';
import './MymusicAICSS.css';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { fetchGenres } from '@/api/genre';
import { GenreData } from '@/types/genre';

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

// 해시태그
const ITEM_HEIGHT2 = 48;
const ITEM_PADDING_TOP2 = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT2 * 4.5 + ITEM_PADDING_TOP2,
      width: 250,
    },
  },
};

const UploadMyMusic = () => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const [genre, setGenre] = useState(true);
  const theme = useTheme();
  // 가사 보유 여부 버튼
  const [lyrics, setLyrics] = React.useState<string | null>('left');
  const [genres, setGenres] = useState<GenreData[]>([]); // 변경: genres 상태 타입 수정
  const [state, setState] = React.useState<boolean>(false);
  const [selectedGenres, setSelectedGenres] = useState<GenreData[]>([]);

  // 장르
  function getStyles(name: string, genreName: string[], theme: Theme) {
    return {
      fontWeight:
        genreName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }

  // Form의 onSubmit 이벤트 핸들러 - 음악 정보 업로드
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 업로드 로직 구현하기
    console.log('음악 업로드:', {
      title,
      prompt,
      tags,
      genre,
      lyrics,
    });
    // 이후에 서버로 데이터를 전송하는 등의 로직을 추가하는 곳
  };

  const handleLyrics = (
    event: React.MouseEvent<HTMLElement>,
    newLyrics: string | null,
  ) => {
    setLyrics(newLyrics);
  };

  useEffect(() => {
    fetchGenres()
      .then((res) => {
        setGenres(res); // 가져온 데이터를 상태에 설정
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, []);

  const [genreName, setgenreName] = React.useState<string[]>([]);
  const handleGenre = (event: SelectChangeEvent<typeof genreName>) => {
    const {
      target: { value },
    } = event;

    // 선택된 장르가 있는지 여부를 판단하여 state를 설정합니다.
    const newState =
      typeof value === 'string'
        ? value.split(',').length > 0
        : value.length > 0;
    setState(newState);

    setgenreName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="pl-[15%] w-full h-screen">
        <div className="flex w-[70%] ml-[15%] mt-[2%]">
          <div className="flex flex-col shadow-indigo-500/100 shadow-lg items-center space-x-4 bg-[#1e1e1e] w-full rounded-xl mb-[4%]">
            <div className="flex flex-col p-[3%] w-[90%] text-[#A97DFF] border-b border-[#727272] text-3xl text-center items-center">
              나만의 음악 등록
            </div>

            {/* 등록할 곡 사진, 제목, 가수명, 용량 */}
            <div className="flex mt-[4%] shadow-lg rounded-xl shadow-neutral-400 space-x-8 p-[3%]">
              <img
                src="https://i.ibb.co/8MTGSjd/image.png"
                alt="프로필 이미지"
                className="size-36 rounded-xl drop-shadow-sm"
              />
              <div className="flex flex-col text-center justify-center">
                <p className="text-white text-xl mb-[20%]">Dangerously</p>
                <p className="text-[#777777] text-base">8.02 MB</p>
              </div>
            </div>
            <form
              id="test"
              className="flex flex-col w-full h-auto"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-center mt-[5%]">
                <label className="p-[1%] text-lg text-[#A97DFF]">제목</label>
                <input
                  className="w-[50%] p-[1%] bg-neutral-700 text-white rounded-lg outline-none border-2 border-purple-950"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center mt-[3%]">
                <label className="p-[1%] text-lg text-[#A97DFF] ">설명</label>
                <textarea
                  className="w-[50%] p-[1%] bg-neutral-700 text-white rounded-lg outline-none border-2 border-purple-950"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              {/* 해시태그 선택 */}
              <div className="flex justify-center mt-[3%]">
                <label className="p-[1%] text-lg text-[#A97DFF]">태그</label>
                <input
                  className="w-[50%] p-[1%] bg-neutral-700 text-white rounded-lg outline-none border-2 border-purple-950"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                />
              </div>
              {/* 가사 보유여부 */}
              <div className="flex justify-center mt-[3%]">
                <ToggleButtonGroup
                  value={lyrics}
                  exclusive
                  onChange={handleLyrics}
                  aria-label="text alignment"
                  color="secondary"
                >
                  <ToggleButton className="bg-[#44334e]" value="left">
                    <p className="text-white">가사 보유 O</p>
                  </ToggleButton>
                  <ToggleButton className="bg-[#44334e]" value="center">
                    <p className="text-white">가사 보유 X</p>
                  </ToggleButton>
                </ToggleButtonGroup>
              </div>
              {/* 장르 선택 */}
              <div className="flex justify-center mt-[3%]">
                <div>
                  <FormControl sx={{ m: 1, width: 300 }}>
                    <InputLabel
                      id="demo-multiple-name-label"
                      color="secondary"
                      className="text-[#a97dff]"
                    >
                      Genre
                    </InputLabel>
                    <Select
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple // 다수 선택 가능
                      value={genreName} // 변경된 부분
                      onChange={handleGenre}
                      input={<OutlinedInput label="genre" />}
                      MenuProps={MenuProps}
                      color="secondary"
                      className="text-[#a0a0a0]"
                    >
                      {genres.map((genre) => (
                        <MenuItem
                          key={genre.genre_id} // 장르의 고유 id를 key로 사용합니다.
                          value={genre.genre_id} // 장르의 id를 value로 사용합니다.
                          style={getStyles(genre.genre_name, genreName, theme)}
                        >
                          {genre.genre_name} {/* 장르의 이름을 표시합니다. */}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="flex h-full items-center justify-center">
                <button
                  className="bottom-[5%] p-[2%]"
                  type="submit"
                  form="test"
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
