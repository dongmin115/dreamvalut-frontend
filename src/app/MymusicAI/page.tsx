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
      {/* <NavBar /> */}
      <div>
        <h2>나만의 음악 업로드</h2>
        <form onSubmit={handleSubmit}>
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
    </>
  );
};

export default UploadMyMusic;
