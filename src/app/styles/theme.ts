import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // 메인 컬러 보라색
      main: '#6C26FF',
    },
    secondary: {
      // 흰색
      main: '#ffffff',
    },
    error: {
      // 빨간색
      main: '#FF4444',
    },
  },
});

export default theme;
