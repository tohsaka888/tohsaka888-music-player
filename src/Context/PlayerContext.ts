import { createContext, Dispatch } from "react";
import { MusicActionType, PlayerContextProps } from "../types";

const PlayerContext = createContext<PlayerContextProps | null>(null);

const PlayerDispatchContext = createContext<Dispatch<MusicActionType> | null>(
  null
);

export default PlayerContext;

export {PlayerDispatchContext};
