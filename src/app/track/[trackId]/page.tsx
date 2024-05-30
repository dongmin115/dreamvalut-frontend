/* eslint-disable no-console */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable operator-linebreak */
/* eslint-disable consistent-return */
/* eslint-disable indent */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-undef */
/* eslint-disable object-curly-newline */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable import/extensions */

'use client';

import { ThemeProvider } from '@emotion/react';
import { Divider, IconButton, Popover, Slider } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeDown from '@mui/icons-material/VolumeDown';
import VolumeUp from '@mui/icons-material/VolumeUp';
import Favorite from '@mui/icons-material/Favorite';
import Menu from '@mui/material/Menu';
import { useEffect, useRef, useState } from 'react';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import { getStreamTrack } from '@/api/playlist';
import { getMusic, disLikes, likes } from '@/api/music';
import theme from '@/app/styles/theme';
import { useSharedAudio } from '@/app/components/audio/Audio';

export default function MusicPage(props: any) {
  // const [selectedPlaylist, setSelectedPlaylist] = useState<number>(1); // 선택한 플레이리스트
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorEl2, setAnchorEl2] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const open2 = Boolean(anchorEl2);
  const id = open2 ? 'simple-popover' : undefined;

  const renderSize = 10; // 한 번에 렌더링할 음악 수
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const {
    audioRef,
    playAudio,
    pauseAudio,
    currentTime,
    setCurrentTime,
    volume,
    setVolume,
    trackId,
    setTrackId,
  } = useSharedAudio();
  // 재생목록 버튼 클릭시 메뉴 열기

  // 현재 재생 목록 가져오기
  const { data, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useInfiniteQuery({
      queryKey: ['Streaming Track'],
      queryFn: ({ pageParam }) => getStreamTrack(pageParam, renderSize),
      initialPageParam: 0,

      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.content.next === null) {
          return undefined;
        }
        return allPages.length;
      },
    });
  const loadMoreRef = useRef(null);

  // 재생중인 음악 정보 가져오기
  const { data: musicData, isLoading: musicLoading } = useQuery({
    queryKey: ['music', props.params.trackId],
    queryFn: () => getMusic(props.params.trackId),
    enabled: !!props.params.trackId,
  });

  useEffect(() => {
    if (musicData && musicLoading === false) {
      setIsLiked(musicData.likes_flag);
    }
  }, [musicData, setIsLiked]);

  // 재생목록 버튼 메뉴 닫기
  const handleClose = () => {
    setAnchorEl(null);
  };
  // 재생목록 버튼 클릭시 메뉴 열기
  const handleClick2 = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl2(event.currentTarget);
  };
  // 재생목록 버튼 메뉴 닫기
  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // 시간 변환 함수
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // 볼륨 크기 조절
  const handleChange = (event: Event, newVolume: number | number[]) => {
    if (audioRef.current) {
      setVolume(newVolume as number);
      audioRef.current.volume = volume / 100;
    }
  };

  // 음악재생
  const [isPaused, setIsPaused] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState(false); // 슬라이더를 드래그 중인지 여부를 나타내는 상태

  // 재생 시간이 변경될 때마다 현재 재생 시간을 설정합니다.
  useEffect(() => {
    const audioElement = audioRef.current;

    if (audioElement) {
      const handleTimeUpdate = () => {
        // 슬라이더를 드래그 중이 아닐 때만 현재 재생 시간을 설정합니다.
        if (!isDragging) {
          setCurrentTime(audioElement.currentTime);
        }
      };
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef.current, isDragging]);

  useEffect(() => {
    setTrackId(props.params.trackId);
    setIsDragging(false);
    // 마우스 업 이벤트를 전역적으로 처리
    const handleMouseUpGlobal = () => {
      setIsDragging(false); // 드래그 상태 업데이트
    };

    window.addEventListener('mouseup', handleMouseUpGlobal); // 전역에 마우스 업 이벤트 추가

    return () => {
      // 클린업 함수에서 이벤트 리스너 제거
      window.removeEventListener('mouseup', handleMouseUpGlobal);
    };
  }, [props.params.trackId]);

  // 슬라이더 변경 시 음악의 재생 시간을 변경합니다.
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    if (!event.defaultPrevented && isDragging) {
      setCurrentTime(newValue as number);
    }
  };

  // 슬라이더에서 마우스를 뗄 때 호출되는 함수
  const handleSliderRelease = () => {
    // 변경된 시간을 재생 시간으로 설정
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime;
    }
  };

  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        root: null, // 기본적으로 브라우저 뷰포트를 root로 사용
        rootMargin: '0px',
        threshold: 0.1, // 타겟 요소가 10% 보이면 콜백 실행
      },
    );
    const loadMoreElement = loadMoreRef.current;
    if (loadMoreElement) {
      observer.observe(loadMoreElement);
    }

    return () => {
      if (loadMoreElement) {
        observer.unobserve(loadMoreElement);
      }
    };
  }, [hasNextPage, fetchNextPage]);

  if (isFetchingNextPage || data === undefined) return <div>Loading...</div>;
  return (
    <ThemeProvider theme={theme}>
      {/* 음악소스 */}
      <audio ref={audioRef} controls preload="auto" className="hidden">
        {!musicLoading && <source src={musicData.track_url} type="audio/wav" />}
      </audio>
      {/* 블러배경 */}
      {!musicLoading && (
        <div className="flex h-screen w-screen flex-row justify-around pl-[15%]">
          <img
            src={musicData.track_image}
            alt="1"
            className="fixed -z-20 h-full w-full blur"
          />
          {/* 검은색 레이어 */}
          <div className="fixed -z-10 h-full w-full bg-black bg-opacity-30" />
          {/* 음악정보 */}
          <div className="flex h-full w-[40%] flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl text-white drop-shadow-lg">
              {musicData.title}
            </h1>
            <p className="text-[#777777] drop-shadow-md">
              {musicData.uploader_name}
            </p>
            {/* 프롬프트 + 썸네일 */}
            <div id="card">
              <div
                id="card-back"
                className="h-96 w-96 rounded-md bg-[#2B2B2B] p-6 drop-shadow-lg"
              >
                <p className="mb-4 text-lg font-semibold">음악생성 프롬프트</p>
                <p className="text-sm">{musicData.prompt}</p>
              </div>
              <img
                id="card-front"
                src={musicData.track_image}
                alt="1"
                className="h-96 w-96 rounded-md drop-shadow-lg"
              />
            </div>
            {/* 재생 컨트롤러 */}
            <div className="w-96">
              <div className="mt-6 flex flex-col items-center">
                <div className="flex w-full flex-row justify-between">
                  <p className="text-sm text-white">
                    {formatTime(currentTime)}
                  </p>
                  <p className="text-sm text-white">
                    {formatTime(musicData.duration)}
                  </p>
                </div>
                <Slider
                  className="time-slider"
                  aria-label="Volume"
                  value={currentTime}
                  onChange={handleSliderChange}
                  onChangeCommitted={handleSliderRelease}
                  onMouseDown={() => {
                    setIsDragging(true);
                  }}
                  size="medium"
                  color="secondary"
                  max={musicData.duration}
                />
              </div>
              <div className="flex justify-between">
                {isLiked ? (
                  <IconButton
                    onClick={() => {
                      setIsLiked(false);
                      disLikes(props.params.trackId).catch(() => {
                        // API 호출이 실패하면 상태를 되돌립니다
                        setIsLiked(true);
                      });
                    }}
                  >
                    <Favorite color="secondary" fontSize="large" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      setIsLiked(true);
                      likes(props.params.trackId).catch(() => {
                        // API 호출이 실패하면 상태를 되돌립니다
                        setIsLiked(false);
                      });
                    }}
                  >
                    <FavoriteBorder color="secondary" fontSize="large" />
                  </IconButton>
                )}
                <IconButton>
                  <SkipPreviousIcon color="secondary" fontSize="large" />
                </IconButton>
                {isPaused ? (
                  <IconButton
                    onClick={() => {
                      playAudio();
                      setIsPaused(false);
                      console.log('trackId:', trackId);
                    }}
                    disabled={musicLoading}
                  >
                    <PlayArrowIcon color="secondary" fontSize="large" />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => {
                      pauseAudio();
                      setIsPaused(true);
                    }}
                  >
                    <PauseIcon color="secondary" fontSize="large" />
                  </IconButton>
                )}
                <IconButton>
                  <SkipNextIcon color="secondary" fontSize="large" />
                </IconButton>
                <IconButton aria-describedby={id} onClick={handleClick2}>
                  <VolumeUp color="secondary" fontSize="large" />
                </IconButton>
                <Popover
                  id={id}
                  open={open2}
                  anchorEl={anchorEl2}
                  onClose={handleClose2}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  sx={{
                    '& .MuiPopover-paper': {
                      backgroundColor: 'transparent',
                      border: 'none',
                      boxShadow: 'none',
                    },
                  }}
                >
                  <div className="flex w-[10vw] flex-row items-center space-x-2 rounded-full bg-black bg-opacity-40 px-4 py-2 shadow-md">
                    <VolumeDown color="secondary" fontSize="medium" />
                    <Slider
                      aria-label="Volume"
                      value={volume}
                      onChange={handleChange}
                      size="small"
                      color="secondary"
                    />
                    <VolumeUp color="secondary" fontSize="medium" />
                  </div>
                </Popover>
              </div>
            </div>
          </div>
          {/* 재생목록 */}
          <div className="flex h-full w-[30%] flex-col items-center justify-center space-y-4">
            <div className="flex h-fit w-full flex-row items-center justify-between">
              <h1 className="m-0 h-fit text-4xl text-white drop-shadow-lg">
                Playlist
              </h1>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
              ></Menu>
            </div>
            <Divider
              variant="fullWidth"
              orientation="horizontal"
              flexItem
              className="w-full bg-white drop-shadow-xl"
            />
            {/* 재생목록 리스트 */}
            <div className="flex h-[26rem] w-full flex-col overflow-y-scroll">
              {data.pages.map((page: any) =>
                page.content.map((content: any) => (
                  <li
                    key={content.id}
                    className="flex w-full flex-row space-x-4 self-start p-2 hover:rounded-md hover:bg-[#040404] hover:bg-opacity-30"
                  >
                    <img
                      src={content.thumbnail_image}
                      alt="음악 커버"
                      className="h-16 w-16 rounded-md drop-shadow-lg"
                    />
                    <div className="flex flex-col items-start justify-center">
                      <p className="text-lg text-white">{content.title}</p>
                      <p className="text-start text-[#777777]">
                        {content.uploader_name}
                      </p>
                    </div>
                  </li>
                )),
              )}
              <div ref={loadMoreRef} className="h-2 w-2 cursor-pointer">
                load
              </div>
            </div>
          </div>
        </div>
      )}
    </ThemeProvider>
  );
}
