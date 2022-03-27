import React, { useContext, useState } from "react";
import { ExtraIconArea, NeumorphismButton } from "./styles/index.style";
import { AiOutlineHeart, AiFillHeart, AiOutlinePlus } from "react-icons/ai";
import PlayerPropsContext from "./Context/PlayerPropsContext";
import VolumeController from "./VolumeController";

function ExtraFeatures() {
  const playerProps = useContext(PlayerPropsContext);

  const defaultFavourState = playerProps?.defaultFavourState || false;
  const likeEvent = playerProps?.likeEvent;
  const unLikeEvent = playerProps?.unLikeEvent;
  const addPlaylistEvent = playerProps?.addPlaylistEvent;

  const [favour, setFavour] = useState<boolean>(defaultFavourState);

  return (
    <ExtraIconArea>
      <VolumeController />
      <NeumorphismButton
        size="small"
        onClick={() => {
          setFavour(!favour);
          if (favour) {
            if (unLikeEvent) {
              unLikeEvent();
            } else {
              alert("unlike");
            }
          } else {
            if (likeEvent) {
              likeEvent();
            } else {
              alert("like");
            }
          }
        }}
      >
        {favour ? <AiFillHeart size={20} /> : <AiOutlineHeart size={20} />}
      </NeumorphismButton>
      <NeumorphismButton
        size="small"
        onClick={() => {
          if (addPlaylistEvent) {
            addPlaylistEvent();
          } else {
            alert("added");
          }
        }}
      >
        <AiOutlinePlus size={20} />
      </NeumorphismButton>
    </ExtraIconArea>
  );
}

export default ExtraFeatures;
