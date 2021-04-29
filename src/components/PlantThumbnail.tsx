import styled from "styled-components";
import { PlantCard } from "./Plant";

interface IProps {
  disabled: boolean;
  image: string;
  name: string;
}

export default function PlantThumbnail({ disabled, image, name }: IProps) {
  return (
    <Plant opacity={disabled ? "0.6" : "1"}>
      <span>{name}</span>
      <img alt={name} src={image} />
    </Plant>
  );
}

const Plant = styled(PlantCard)`
  cursor: default;
  height: 55px;
  width: 60px;
  > span {
    font-size: 10px;
    margin-bottom: 2px;
  }
  > img {
    height: 32px;
    width: 35px;
  }
  &:hover {
    box-shadow: inset 0px 0px 2px black;
    transform: none;
  }
`;
