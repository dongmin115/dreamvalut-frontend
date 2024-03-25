/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import React, { useState } from 'react';
import NavBar from '../components/NavBar/NavigationBar';

const UploadMyMusic = () => {
  const [title, setTitle] = useState('');
  const [prompt, setPrompt] = useState('');
  const [tags, setTags] = useState('');
  const [genre, setGenre] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // 업로드 로직 구현하기
    console.log('음악 업로드:', {
      title,
      prompt,
      tags,
      genre,
    });
    // 이후에 서버로 데이터를 전송하는 등의 로직을 추가할 수 있습니다.
  };

  return (
    <>
      <NavBar />
      <div className="flex flex-col w-screen h-screen bg-emerald-600">
        <div className="flex flex-col ml-[22%] rounded-xl bg-slate-400 justify-start mt-[3%] items-center w-[70%] h-[80%]">
          <p className="text-3xl mb-[3%] mt-[3%]">나만의 음악 업로드</p>
          {/* 선 */}
          <div className="flex flex-col bg-white w-[90%] h-[0.3%] rounded-md"></div>
          {/* 제목, 프롬프트, 태그, 장르 */}
          <form
            className="flex flex-col mt-[3%] bg-gray-600 w-f h-scree"
            onSubmit={handleSubmit}
          >
            <div>
              <label>제목:</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div>
              <label>프롬프트:</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                required
              />
            </div>
            <div>
              <label>태그:</label>
              <input
                type="text"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                required
              />
            </div>
            <div>
              <label>장르:</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                required
              />
            </div>
            <button type="submit">업로드</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UploadMyMusic;
