/* eslint-disable no-unused-vars */

'use client';

import { IconButton, ThemeProvider } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import theme from '../../styles/theme.ts';

function PlayButton(playlistId: any) {
  return (
    <ThemeProvider theme={theme}>
      <IconButton className="mx-28">
        <PlayCircleIcon color="primary" style={{ fontSize: 60, opacity: 1 }} />
      </IconButton>
    </ThemeProvider>
  );
}

export default PlayButton;
