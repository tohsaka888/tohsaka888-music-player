type NextOrPrevPlayEvent = (...args: any) => void;

type PauseEvent = () => void;

type PlayEvent = () => void;

export type PlayerContextProps = {
  duration: number;
  currentTime: number;
};

export type Music = {
  currentTime: number;
  duration: number;
  playing: boolean;
  id: number;
};

export type MusicActionType =
  | { type: "playing"; payload: number }
  | { type: "play"; payload: undefined }
  | { type: "pause"; payload: undefined }
  | { type: "initial"; payload: Music };

export type Player = {
  src?: string;
  picUrl?: string;
  musicName?: string;
  artists?: string[];
  nextPlayEvent?: NextOrPrevPlayEvent;
  prevPlayEvent?: NextOrPrevPlayEvent;
  pauseEvent?: PauseEvent;
  playEvent?: PlayEvent;
  autoPlay?: boolean;
  id: number;
  defaultFavourState?: boolean;
  likeEvent?: Function;
  unLikeEvent?: Function;
  addPlaylistEvent?: Function;
};
