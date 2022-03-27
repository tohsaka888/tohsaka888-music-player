import Slider from "rc-slider";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  animated,
  useChain,
  useSpring,
  useSpringRef,
  config,
} from "react-spring";
import { CSSProperties } from "styled-components";
import PlayerPropsContext from "./Context/PlayerPropsContext";
import { BsFillVolumeUpFill, BsFillVolumeMuteFill } from "react-icons/bs";
import { NeumorphismButton } from "./styles/index.style";

function VolumeController() {
  const playerProps = useContext(PlayerPropsContext);
  const [show, setShow] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [autoHidden, setAutoHidden] = useState<boolean>(false);
  const [isCancelShow, setIsCancelShow] = useState<boolean>(false);
  const intervalRef = useRef<number>(0);
  const cancelRef = useRef<number>(0);
  const audioRef = playerProps?.audioRef;
  const controllerRef = useSpringRef();
  const iconRef = useSpringRef();

  const controllerStyles = useSpring<CSSProperties>({
    to: async (next, cancel) => {
      await next(show ? { display: "block" } : { height: "32px" });
      await next(show ? { height: "70px" } : { display: "none" });
    },
    from: { display: "none", height: "0px" },
    ref: controllerRef,
    config: config.default,
  });

  let volume =
    audioRef && audioRef.current ? audioRef.current.volume * 100 : 100;

  const iconStyle = useSpring<CSSProperties>({
    display: show ? "none" : "block",
    ref: iconRef,
  });

  useChain(show ? [iconRef, controllerRef] : [controllerRef, iconRef]);

  useEffect(() => {
    if (autoHidden) {
      intervalRef.current = window.setTimeout(() => {
        setShow(false);
        setAutoHidden(false);
      }, 2000);
    } else {
      window.clearInterval(intervalRef.current);
    }

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [autoHidden]);

  useEffect(() => {
    return () => {
      window.clearInterval(cancelRef.current);
      setIsCancelShow(false);
      cancelRef.current = 0;
    };
  }, [isCancelShow]);

  return (
    <>
      <animated.div style={iconStyle}>
        <NeumorphismButton
          onMouseEnter={() => {
            if (cancelRef.current === 0) {
              cancelRef.current = window.setTimeout(() => {
                setShow(true);
                cancelRef.current = 0;
              }, 500);
              setAutoHidden(true);
            }
          }}
          size="small"
          onClick={() => {
            setIsMuted(!isMuted);
            setIsCancelShow(true);
            if (audioRef && audioRef.current) {
              if (isMuted) {
                audioRef.current.muted = false;
              } else {
                audioRef.current.muted = true;
              }
            }
          }}
        >
          {isMuted ? (
            <BsFillVolumeMuteFill size={20} />
          ) : (
            <BsFillVolumeUpFill size={20} />
          )}
        </NeumorphismButton>
      </animated.div>
      <animated.div style={controllerStyles}>
        <NeumorphismButton
          size="small"
          style={{ height: "100%", borderRadius: "16px" }}
        >
          <div style={{ margin: "10px 0px", height: "70%" }}>
            <Slider
              vertical
              onBeforeChange={() => setAutoHidden(false)}
              onAfterChange={() =>
                setTimeout(() => {
                  setShow(false);
                }, 500)
              }
              max={100}
              min={0}
              defaultValue={volume}
              onChange={(value) => {
                if (
                  typeof value === "number" &&
                  audioRef &&
                  audioRef?.current
                ) {
                  audioRef.current.volume = value / 100;
                }
              }}
            />
          </div>
        </NeumorphismButton>
      </animated.div>
    </>
  );
}

export default VolumeController;
