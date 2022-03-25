import { createContext, MutableRefObject } from "react";
import { Player } from "../types";

const PlayerPropsContext =
  createContext<
    | (Player & { audioRef: MutableRefObject<HTMLAudioElement | undefined> })
    | null
  >(null);

export default PlayerPropsContext;
