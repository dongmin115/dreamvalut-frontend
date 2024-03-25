/* eslint-disable no-restricted-globals */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import React, { useState } from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import FileUploadTwoToneIcon from '@mui/icons-material/FileUploadTwoTone';
import FileUploadSharpIcon from '@mui/icons-material/FileUploadSharp';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../components/NavBar/NavigationBar';

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
      <div className="flex flex-col w-screen h-screen bg-emerald-600">
        <div className="flex flex-col ml-[22%] rounded-xl bg-slate-400 justify-start mt-[3%] items-center w-[70%] h-[80%]">
          <p className="text-3xl mb-[2%] mt-[2%]">나만의 음악 업로드</p>
          {/* 선 */}
          <div className="flex flex-col bg-white w-[90%] h-[0.3%] rounded-md"></div>
          {/* 제목, 프롬프트, 태그, 장르 */}
          <form
            className="flex flex-col justify-between bg-gray-600 h-full w-full"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col mr-[8%]">
              <div className="flex justify-end mt-[4%]">
                <label className="p-[1%]">제목:</label>
                <input
                  className="w-[50%] h-[100%] text-black"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end mt-[3%]">
                <label className="p-[1%]">프롬프트:</label>
                <input
                  className="w-[50%] h-[300%] text-black"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end mt-[12%]">
                <label className="p-[1%]">태그:</label>
                <input
                  className="w-[50%] h-[200%] text-black"
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  required
                />
              </div>
              <div className="flex justify-end mt-[8%]">
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
            </div>
            <div className="flex flex-col items-end">
              <button className="text-xl" type="submit">
                업로드
              </button>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default UploadMyMusic;
