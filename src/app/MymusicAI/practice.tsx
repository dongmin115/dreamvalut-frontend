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
import { Genre, GenreData } from '@/types/genre';
import { useQuery } from '@tanstack/react-query';
import uploadMymusic from '@/api/uploadmymusic';
import axios from 'axios';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

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

export default function Register() {
  const [isMember, setIsMember] = useState(false);

  const onSubmit = (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    console.log(formData);
  };

  return (
    <section className="bg-gray-600 pl-[40%] register-page full-page">
      <form className="form" onSubmit={onSubmit}>
        <h3>{isMember ? 'Login' : 'Register'}</h3>
        {/* Name Field */}
        {!isMember && (
          <div className="form-row">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input id="name" type="text" name="name" className="form-input" />
          </div>
        )}
      </form>
    </section>
  );
}
