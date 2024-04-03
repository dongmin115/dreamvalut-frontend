/* eslint-disable no-undef */
/* eslint-disable import/extensions */
// import MusicBar from './components/Musicbar/Musicbar';
// import NavBar from './components/NavBar/NavigationBar';

// import LogIn from './LogInPage/page';

'use client';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenrePage from './GenrePage/page';
// import React from 'react';
// import UploadMyMusic from './MymusicAI/page';
// App 컴포넌트
export default function Home() {
  return (
    <>
      {/* <NavBar />
      <MusicBar /> */}
      {/* <LogIn /> */}
      <Router>
        <Routes>
          <Route path="/" element={<GenrePage />} />
        </Routes>
      </Router>
      {/* <UploadMyMusic /> */}
    </>
  );
}
