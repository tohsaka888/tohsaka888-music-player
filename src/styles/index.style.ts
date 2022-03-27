import styled from "styled-components";

export const Flex = styled.div`
  display: flex;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  align-items: center;
`;

export const MultiEllipsis = styled.div<{ cols: number }>`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${({ cols }) => cols};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  word-break: break-all;
`;

export const MusicName = styled(MultiEllipsis)`
  font-size: 1rem;
  user-select: none;
  /* align-self: flex-start; */
  /* text-shadow: 2px 1px 1px #cecece; */
`;

export const PlayerContainer = styled(Flex)`
  height: 70px;
  padding: 8px;
  /* color: white; */
`;

export const MusicInfoArea = styled(Grid)<{ minWidth?: number }>`
  min-width: ${({ minWidth }) => minWidth || "70px"};
  align-items: center;
  grid-auto-flow: column;
  width: 100%;
  padding-left: 10px;
  justify-content: flex-start;
  height: 100%;
`;

export const MusicInfoContainer = styled(Grid)`
  flex: 1;
  height: 100%;
`;

export const Artists = styled(MultiEllipsis)`
  font-size: 0.8rem;
  color: gray;
  user-select: none;
  /* align-self: center; */
`;

export const TimeInfoArea = styled(Flex)`
  padding: 0px;
  font-size: 12px;
  margin: 0px 0px 0px 8px;
  padding-bottom: 1px;
  user-select: none;
`;

export const CoverImage = styled.img`
  width: 70px;
  height: 70px;
  margin-right: 8px;
  border-radius: 8px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 5px 5px 9px #ebebeb, -5px -5px 9px #ffffff;
  user-select: none;
`;

export const IconArea = styled(Grid)`
  width: 100px;
  margin-right: 16px;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  justify-content: center;
`;

const showSize = ({
  size = "default",
}: {
  size: "large" | "default" | "small";
}) => {
  switch (size) {
    case "small":
      return "30px";
    case "default":
      return "36px";
    case "large":
      return "44px";
  }
};

export const NeumorphismButton = styled.div<{
  size: "large" | "default" | "small";
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 2px 2px 10px #e3e3e3, -11px -11px 10px #ffffff;
  border: none;
  width: ${showSize};
  height: ${showSize};
  cursor: pointer;
  :active {
    border-radius: 50%;
    background: #ffffff;
    box-shadow: inset 5px 5px 9px #ebebeb, inset -5px -5px 9px #ffffff;
    opacity: 0.8;
    border: none;
    user-select: none;
  }
`;

export const SliderContainer = styled(Flex)`
  border-radius: 60px;
  /* border-top: 1px solid #ebebeb; */
  background: linear-gradient(145deg, #f9f9f9, #ffffff, #f9f9f9);
  box-shadow: 1px 5px 9px #ebebeb, -1px -1px 9px #ebebeb;
  width: 100%;
  padding: 10px 15px 10px 20px;
  align-items: center;
  align-self: flex-end;
`;

export const ExtraIconArea = styled(Grid)`
  width: 120px;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  justify-content: flex-end;
  position: relative;
  margin-left: 20px;
  align-items: flex-end;
  height: 100%;
`;
