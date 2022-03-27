import React, {
  HTMLAttributes,
  RefAttributes,
  useCallback,
  useEffect,
  useReducer,
  useRef,
} from "react";
import { Music, MusicActionType, Player } from "./types";
import "rc-slider/assets/index.css";
import PlayerContext, { PlayerDispatchContext } from "./Context/PlayerContext";
import MusicController from "./MusicController";
import PlayerPropsContext from "./Context/PlayerPropsContext";

type PlayerProps = Player &
  HTMLAttributes<HTMLDivElement> &
  RefAttributes<Player & HTMLAttributes<HTMLDivElement>>;

const initialplayerState: Music = {
  duration: 0,
  currentTime: 0,
  playing: false,
  id: -1,
};

function MusicPlayer({
  src,
  picUrl,
  musicId = 0,
  playEvent,
  pauseEvent,
  musicName,
  artists,
  autoPlay = false,
  nextPlayEvent,
  prevPlayEvent,
  likeEvent,
  defaultFavourState = false,
  unLikeEvent,
  addPlaylistEvent,
  ...props
}: PlayerProps): JSX.Element {
  const audioRef = useRef<HTMLAudioElement>();
  const intervalRef = useRef<number>(-1);

  const playerReducer = useCallback(
    (preState: Music, action: MusicActionType) => {
      switch (action.type) {
        case "playing":
          return { ...preState, currentTime: action.payload };
        case "play":
          return { ...preState, playing: true };
        case "pause":
          return { ...preState, playing: false };
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

  useEffect(() => {
    if (playerState.playing) {
      const callback = () => {
        const currentTime = audioRef.current?.currentTime || 0;
        playerDispatch({ type: "playing", payload: currentTime });
      };
      intervalRef.current = window.setInterval(callback, 300);
    } else {
      window.clearInterval(intervalRef.current);
    }
  }, [playerState.playing]);

  const onCanplay = useCallback(() => {
    const duration = audioRef.current?.duration || 0;
    if (musicId !== playerState.id) {
      playerDispatch({
        type: "initial",
        payload: { currentTime: 0, duration, id: musicId, playing: autoPlay },
      });
    }
  }, [autoPlay, musicId, playerState.id]);

  const onPlay = useCallback(() => {
    playerDispatch({
      type: "play",
      payload: undefined,
    });
    if (playEvent) {
      playEvent();
    }
  }, [playEvent]);

  const onPause = useCallback(() => {
    playerDispatch({ type: "pause", payload: undefined });
    if (pauseEvent) {
      pauseEvent();
    }
  }, [pauseEvent]);

  return (
    <PlayerPropsContext.Provider
      value={{
        artists,
        autoPlay,
        audioRef,
        musicId,
        nextPlayEvent,
        prevPlayEvent,
        picUrl,
        musicName,
        likeEvent,
        defaultFavourState,
        unLikeEvent,
        addPlaylistEvent,
        ...props
      }}
    >
      <PlayerContext.Provider value={playerState}>
        <PlayerDispatchContext.Provider value={playerDispatch}>
          {src && (
            <audio
              src={src}
              // controls
              autoPlay={autoPlay}
              ref={(ref) => {
                if (ref) {
                  audioRef.current = ref;
                }
              }}
              onPlay={onPlay}
              onPause={onPause}
              onCanPlay={onCanplay}
            />
          )}
          <MusicController {...props} />
        </PlayerDispatchContext.Provider>
      </PlayerContext.Provider>
    </PlayerPropsContext.Provider>
  );
}

export default MusicPlayer;
