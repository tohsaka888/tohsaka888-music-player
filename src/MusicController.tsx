import moment from "moment";
import Slider from "rc-slider";
import React, { useContext, useState } from "react";
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
  MusicInfoContainer,
} from "./styles/index.style";
import {
  BsFillPauseFill,
  BsFillPlayFill,
  BsFillSkipStartFill,
  BsFillSkipEndFill,
} from "react-icons/bs";
import PlayerPropsContext from "./Context/PlayerPropsContext";
import ExtraFeatures from "./ExtraFeatures";

const defaultPicUrl = `https://www.esp-4u.com/d/uploads/2021-08-29/bedcafc472655fe2919cc6b20d68bf01.jpeg`;

function MusicController() {
  const musicProps = useContext(PlayerContext);
  const playerDispatch = useContext(PlayerDispatchContext);
  const playerProps = useContext(PlayerPropsContext);

  const musicName = playerProps?.musicName;
  // const id = playerProps?.id;
  const artists = playerProps?.artists;
  const audioRef = playerProps?.audioRef;
  const prevPlayEvent = playerProps?.prevPlayEvent;
  const nextPlayEvent = playerProps?.nextPlayEvent;
  const pauseEvent = playerProps?.pauseEvent;
  const playEvent = playerProps?.playEvent;
  const picUrl = playerProps?.picUrl;

  const [sliderValue, setSliderValue] = useState<number>(-1);

  const currentTime = musicProps?.currentTime || 0;
  const duration = musicProps?.duration || 0;

  const isPlaying =
    audioRef && audioRef.current ? !audioRef.current.paused : false;
  const src = audioRef && audioRef.current?.src;

  const onAfterChange = (value: number | number[]) => {
    setSliderValue(-1);
    if (typeof value === "number" && playerDispatch) {
      playerDispatch({ type: "playing", payload: value });
      if (audioRef && audioRef.current) {
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
    <PlayerContainer {...playerProps}>
      <IconArea>
        <NeumorphismButton
          size="small"
          onClick={() => {
            if (!prevPlayEvent) {
              alert("play previous song");
            } else {
              prevPlayEvent();
            }
          }}
        >
          <BsFillSkipStartFill size={20} color={"#333333"} />
        </NeumorphismButton>
        {isPlaying ? (
          <NeumorphismButton
            size="default"
            onClick={() => {
              if (audioRef && audioRef.current) {
                audioRef.current.pause();
                if (pauseEvent) {
                  pauseEvent();
                }
              }
            }}
          >
            <BsFillPauseFill size={25} color={"#333333"} />
          </NeumorphismButton>
        ) : (
          <NeumorphismButton size="default">
            <BsFillPlayFill
              size={25}
              color={"#333333"}
              onClick={() => {
                if (!src) {
                  alert("no playing song");
                }
                if (audioRef && audioRef.current) {
                  audioRef.current.play();
                  if (playEvent) {
                    playEvent();
                  }
                }
              }}
            />
          </NeumorphismButton>
        )}
        <NeumorphismButton size="small">
          <BsFillSkipEndFill
            size={20}
            color={"#333333"}
            onClick={() => {
              if (!nextPlayEvent) {
                alert("play next song");
              } else {
                nextPlayEvent();
              }
            }}
          />
        </NeumorphismButton>
      </IconArea>
      <CoverImage src={picUrl || defaultPicUrl} alt={picUrl || defaultPicUrl} />
      <MusicInfoContainer>
        <MusicInfoArea>
          <MusicName cols={1}>
            {musicName || "Opps,choose a music plz!"} &nbsp;
          </MusicName>
          <Artists cols={1}>
            {artists ? artists.join("/") : "sorry,i can't show artists"}
          </Artists>
        </MusicInfoArea>
        <SliderContainer>
          <Slider
            disabled={!src}
            value={sliderValue === -1 ? currentTime : sliderValue}
            max={duration}
            min={0}
            onAfterChange={onAfterChange}
            onChange={onChange}
            style={{ flex: 1 }}
          />
          <TimeInfoArea>
            {moment(
              (sliderValue === -1 ? currentTime : sliderValue) * 1000
            ).format("mm:ss")}
            / {moment(duration * 1000).format("mm:ss")}
          </TimeInfoArea>
        </SliderContainer>
      </MusicInfoContainer>
      <ExtraFeatures />
    </PlayerContainer>
  );
}

export default MusicController;
