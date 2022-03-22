import Slider from "rc-slider";
import React, { useContext, useState } from "react";
import PlayerContext, { PlayerDispatchContext } from "./Context/PlayerContext";
import { CoverImage, PlayerContainer } from "./styles/index.style";
import { Player } from "./types";

const defaultPicUrl = `https://www.esp-4u.com/d/uploads/2021-08-29/bedcafc472655fe2919cc6b20d68bf01.jpeg`;

function MusicPlayer({ picUrl, src, id }: Player) {
  const musicProps = useContext(PlayerContext);
  const playerDispatch = useContext(PlayerDispatchContext);
  const [sliderValue, setSliderValue] = useState<number>(-1);

  const currentTime = musicProps?.currentTime;
  const duration = musicProps?.duration;

  const onAfterChange = (value: number | number[]) => {
    setSliderValue(() => {
      console.log('ok')
      return -1
    });
    if (typeof value === "number" && playerDispatch) {
      playerDispatch({ type: "playing", payload: value });
    }
  };

  const onChange = (value: number | number[]) => {
    if (typeof value === "number") {
      setSliderValue(value);
    }
  };

  return (
    <PlayerContainer>
      <CoverImage src={picUrl || defaultPicUrl} alt={picUrl || defaultPicUrl} />
      <Slider
        disabled={!!src}
        value={sliderValue === -1 ? currentTime : sliderValue}
        max={duration}
        min={0}
        onAfterChange={onAfterChange}
        onChange={onChange}
      />
    </PlayerContainer>
  );
}

export default MusicPlayer;
