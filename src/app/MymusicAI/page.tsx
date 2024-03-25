/* eslint-disable no-console */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import FileUploadRoundedIcon from '@mui/icons-material/FileUploadRounded';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/NavBar/NavigationBar';
import './MymusicAICSS.css';

const theme = createTheme({
  palette: {
    primary: {
      // 검은색
      main: '#000000',
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
  const [tags, setTags] = useState('');
  const [genre, setGenre] = useState(true);

  // 장르 드롭다운 박스
  const handleClick = () => {
    setGenre(!genre);
  };

  // Form의 onSubmit 이벤트 핸들러 - 음악 정보 업로드
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 업로드 로직 구현하기
    console.log('음악 업로드:', {
      title,
      prompt,
      tags,
      genre,
    });
    // 이후에 서버로 데이터를 전송하는 등의 로직을 추가하는 곳
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <div className="pl-[15%] w-screen h-screen bg-amber-900">
        <div className="flex w-[70%] h-[100%] pt-[2%] pb-[2%] ml-[15%] ">
          <div className="flex flex-col items-center space-x-4 bg-[#353535] w-full h-full rounded-xl p-[4%] justify-between shadow-md">
            <p className="flex text-3xl items-center mb-[2%]">
              나만의 음악 업로드
            </p>
            {/* 선 */}
            <div className="flex flex-col bg-white w-[100%] h-[0.3%] rounded-md"></div>
            {/* 등록할 곡 사진, 제목, 가수명, 용량 */}
            <div className="flex flex-row space-x-8 p-[3%]">
              <img
                src="https://i.ibb.co/8MTGSjd/image.png"
                alt="프로필 이미지"
                className="size-36 rounded-xl drop-shadow-sm"
              />
              <div className="flex flex-col text-center justify-center">
                <p className="text-white text-xl">Dangerously</p>
                <p className="text-[#777777] text-lg">Charlie Puth</p>
                <p className="text-[#777777] text-base">8.02 MB</p>
              </div>
            </div>
            <form
              id="test"
              className="flex flex-col h-[77%] w-full ml-0"
              onSubmit={handleSubmit}
            >
              <div className="flex justify-center mt-[4%]">
                <label className="p-[1%]">제목:</label>
                <input
                  className="w-[50%] h-[100%] text-black"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center mt-[3%]">
                <label className="p-[1%]">설명:</label>
                <input
                  className="w-[50%] h-[300%] text-black"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center mt-[12%]">
                <label className="p-[1%]">태그:</label>
                <input
                  className="w-[50%] h-[200%] text-black"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-center mt-[8%]">
                <label className="p-[1%]">장르:</label>
                <List
                  sx={{
                    width: '100%',
                    maxWidth: '50%',
                    bgcolor: 'background.paper',
                    overflow: 'auto',
                    position: 'relative',
                    height: '100%',
                    maxHeight: 200,
                    zIndex: 20,
                  }}
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                >
                  <ListItemButton onClick={handleClick}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText className="text-black" primary="장르 선택" />
                    {genre ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="POP" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="RnB" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="Jazz" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                          className="text-black"
                          primary="Ballade"
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                          className="text-black"
                          primary="Classical"
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="Rock" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                          className="text-black"
                          primary="Hip-Hap"
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="Folk" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="OST" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="J-POP" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText
                          className="text-black"
                          primary="Musical"
                        />
                      </ListItemButton>
                    </List>
                  </Collapse>
                  <Collapse in={genre} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText className="text-black" primary="EDM" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                </List>
              </div>
            </form>
            <button
              className="fixed bottom-[5%] items-end p-[2%]"
              type="submit"
              form="test"
            >
              <FileUploadRoundedIcon sx={{ fontSize: 60 }} color="secondary" />
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadMyMusic;
