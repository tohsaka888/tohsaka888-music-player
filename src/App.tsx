import React, { useCallback, useReducer, useRef, useState } from "react";
import "./App.css";
import { Music, MusicActionType, Player } from "./types";
import "rc-slider/assets/index.css";
import PlayerContext, { PlayerDispatchContext } from "./Context/PlayerContext";
import MusicPlayer from "./MusicPlayer";

const defaultSrc =
  "http://m701.music.126.net/20220322154342/62107709effc0bf53e96ec7f0dcbd475/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/5537344714/ef40/ccc5/5f7d/016d259d584e04f7df47dfbd2a2cc2d9.mp3";

const initialplayerState: Music = {
  duration: 0,
  currentTime: 0,
  playing: true,
  id: -1,
};

function App({ src, picUrl, id = -1 }: Player) {
  const audioRef = useRef<HTMLAudioElement>();
  const [intervalId, setIntervalId] = useState<number>(-1);

  const playerReducer = useCallback(
    (preState: Music, action: MusicActionType) => {
      switch (action.type) {
        case "playing":
          return { ...preState, currentTime: action.payload };
        case "isPlaying":
          return { ...preState, playing: !preState.playing };
        case "initial":
          return action.payload;
      }
    },
    []
  );

  const [playerState, playerDispatch] = useReducer(
    playerReducer,
    initialplayerState
  );

  const onPlay = useCallback(() => {
    const duration = audioRef.current?.duration || 0;

    if (id === -1) {
      playerDispatch({
        type: "initial",
        payload: { currentTime: 0, duration, id, playing: true },
      });
    } else {
      playerDispatch({
        type: "isPlaying",
        payload: undefined,
      });
    }
    const callback = () => {
      const currentTime = audioRef.current?.currentTime || 0;
      playerDispatch({ type: "playing", payload: currentTime });
    };
    setIntervalId(() => window.setInterval(callback, 300));
  }, [id]);

  const onPause = useCallback(() => {
    playerDispatch({ type: "isPlaying", payload: undefined });
    window.clearInterval(intervalId);
  }, [intervalId]);

  return (
    <PlayerContext.Provider value={playerState}>
      <PlayerDispatchContext.Provider value={playerDispatch}>
        <audio
          src={src || defaultSrc}
          controls
          autoPlay={false}
          ref={(ref) => {
            if (ref) {
              audioRef.current = ref;
            }
          }}
          onPlay={onPlay}
          onPause={onPause}
        />
        <MusicPlayer picUrl={picUrl} id={id} />
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  );
}

export default App;
