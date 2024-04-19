/* eslint-disable no-undef */

'use client';

// eslint-disable-next-line object-curly-newline
import { createContext, useContext, useRef, ReactNode } from 'react';

interface SharedAudioState {
  audioRef: React.MutableRefObject<HTMLAudioElement | null>;
  playAudio: () => void;
  pauseAudio: () => void;
}

const SharedAudioContext = createContext<SharedAudioState | undefined>(
  undefined,
);

export const SharedAudioProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 재생 함수
  const playAudio = () => {
    if (audioRef.current) {
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

  // 오디오 상태 및 제어 함수 공유
  const sharedState: SharedAudioState = {
    audioRef,
    playAudio,
    pauseAudio,
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
