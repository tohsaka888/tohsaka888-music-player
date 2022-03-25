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
  align-self: flex-start;
  /* text-shadow: 2px 1px 1px #cecece; */
`;

export const PlayerContainer = styled(Flex)`
  height: 60px;
  padding: 8px;
  /* color: white; */
`;

export const MusicInfoArea = styled(Grid)<{ minWidth?: number }>`
  max-width: 150px;
  min-width: ${({ minWidth }) => minWidth || "80px"};
  margin-right: 8px;
  flex-direction: column;
  height: 100%;
  align-items: flex-start;
  grid-auto-flow: row;
  padding: 5px 0px;
  margin-left: 8px;
`;

export const MusicInfoContainer = styled(Flex)`
  border-radius: 5px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 5px 5px 9px #ebebeb, -5px -5px 9px #ffffff;
`;

export const Artists = styled(MultiEllipsis)`
  font-size: 12px;
  align-self: flex-end;
`;

export const TimeInfoArea = styled(Flex)`
  padding: 0px;
  font-size: 1rem;
  margin: 0px 0px 0px 16px;
`;

export const CoverImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 8px;
  border-radius: 8px;
  background: linear-gradient(145deg, #ffffff, #e6e6e6);
  box-shadow: 5px 5px 9px #ebebeb, -5px -5px 9px #ffffff;
`;

export const IconArea = styled(Grid)`
  width: 120px;
  margin-right: 8px;
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
      return "32px";
    case "default":
      return "38px";
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
  height: 80%;
  border-radius: 60px;
  background: linear-gradient(145deg, #f9f9f9, #ffffff, #f9f9f9);
  box-shadow: 5px 5px 9px #ebebeb, -5px -5px 9px #ffffff;
  flex: 1;
  padding: 0px 2%;
`;

export const ExtraIconArea = styled(Grid)`
  width: 120px;
  grid-auto-flow: column;
  grid-column-gap: 4px;
  justify-content: center;
`;
