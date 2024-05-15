/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */

'use client';

// eslint-disable-next-line object-curly-newline
import {
  createContext,
  useContext,
  useRef,
  ReactNode,
  useState,
  useEffect,
} from 'react';

interface SharedAudioState {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playAudio: () => void;
  pauseAudio: () => void;
  currentTime: number;
  setCurrentTime: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
}

const SharedAudioContext = createContext<SharedAudioState | undefined>(
  undefined,
);

export const SharedAudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0); // 초기 값은 0으로 설정
  // 볼륨조절
  const [volume, setVolume] = useState<number>(30);

  // 재생 함수
  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = currentTime; // 시작 시간 설정
      audioRef.current
        .play()
        .then(() => {
          console.log('Audio is playing');
        })
        .catch((error) => {
          console.error('Error playing audio:', error);
        });
    }
  };

  // 일시 정지 함수
  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  // 시간 업데이트 핸들러
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(currentTime);
    }
  };

  // useEffect를 사용하여 재생 시간이 변경될 때마다 핸들러를 등록
  useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.addEventListener('timeupdate', handleTimeUpdate);
      return () => {
        audioElement.removeEventListener('timeupdate', handleTimeUpdate);
      };
    }
  }, [audioRef, handleTimeUpdate]);

  // 오디오 상태 및 제어 함수 공유
  const sharedState: SharedAudioState = {
    audioRef,
    playAudio,
    pauseAudio,
    currentTime,
    setCurrentTime,
    volume,
    setVolume,
  };

  return (
    <SharedAudioContext.Provider value={sharedState}>
      {children}
    </SharedAudioContext.Provider>
  );
};

export const useSharedAudio = (): SharedAudioState => {
  const context = useContext(SharedAudioContext);
  if (!context) {
    throw new Error('useSharedAudio must be used within a SharedAudioProvider');
  }
  return context;
};
