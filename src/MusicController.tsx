import moment from "moment";
import Slider from "rc-slider";
import React, { MutableRefObject, useContext, useState } from "react";
import PlayerContext, { PlayerDispatchContext } from "./Context/PlayerContext";
import {
  CoverImage,
  MusicName,
  MusicInfoArea,
  PlayerContainer,
  TimeInfoArea,
  Artists,
  IconArea,
  NeumorphismButton,
  SliderContainer,
} from "./styles/index.style";
import { Player } from "./types";
import {
  BsFillPauseFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
} from "react-icons/bs";

const defaultPicUrl = `https://www.esp-4u.com/d/uploads/2021-08-29/bedcafc472655fe2919cc6b20d68bf01.jpeg`;

function MusicPlayer({
  picUrl,
  src,
  audioRef,
  musicName,
  artists,
}: Player & { audioRef: MutableRefObject<HTMLAudioElement | undefined> }) {
  const musicProps = useContext(PlayerContext);
  const playerDispatch = useContext(PlayerDispatchContext);
  const [sliderValue, setSliderValue] = useState<number>(-1);

  const currentTime = musicProps?.currentTime || 0;
  const duration = musicProps?.duration || 0;

  const onAfterChange = (value: number | number[]) => {
    setSliderValue(-1);
    if (typeof value === "number" && playerDispatch) {
      playerDispatch({ type: "playing", payload: value });
      if (audioRef.current) {
        audioRef.current.currentTime = value;
      }
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
      <MusicInfoArea>
        <MusicName cols={2}>One Last Kiss</MusicName>
        <Artists cols={1}>11111111111</Artists>
      </MusicInfoArea>
      <SliderContainer>
        <Slider
          disabled={!!src}
          value={sliderValue === -1 ? currentTime : sliderValue}
          max={duration}
          min={0}
          onAfterChange={onAfterChange}
          onChange={onChange}
          style={{ flex: 1 }}
        />
      </SliderContainer>
      <TimeInfoArea>
        {moment((sliderValue === -1 ? currentTime : sliderValue) * 1000).format(
          "mm:ss"
        )}
        / {moment(duration * 1000).format("mm:ss")}
      </TimeInfoArea>
      <IconArea>
        <NeumorphismButton size="small">
          <BsFillSkipStartFill size={20} color={"#333333"} />
        </NeumorphismButton>
        <NeumorphismButton size="default">
          <BsFillPauseFill size={25} color={"#333333"} />
        </NeumorphismButton>
        <NeumorphismButton size="small">
          <BsFillSkipEndFill size={20} color={"#333333"} />
        </NeumorphismButton>
      </IconArea>
    </PlayerContainer>
  );
}

export default MusicPlayer;
