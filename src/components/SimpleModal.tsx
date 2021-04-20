import React from "react";
import styled from "styled-components";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";

interface ModalTexts {
  nameError: Sign;
  rules: Sign;
  terrains: Sign;
  win: Sign;
  lose: Sign;
  device: Sign;
}

interface Sign {
  className?: string;
  title: string;
  paragraphs: string[];
  top?: string;
  left?: string;
}

const modalTexts: ModalTexts = {
  nameError: {
    title: "Nameless people are not allowed in Animal Cardom!",
    paragraphs: ["Please enter a name and try to play again"],
  },
  rules: {
    className: "responsive-container",
    title: "Animal Cardom rules",
    paragraphs: [
      "You have five different animals cards, and three different plants to apply on them if wanted. A terrain will be randomly set at the very start.",
      "Each card has an ability, an attack and life points, and also belongs to a family which can give you benefits or not depending on the terrain or other cards' abilities.",
      "The objective is to kill all opponent's cards.",
      "Have fun!",
    ],
  },
  terrains: {
    className: "responsive-container",
    title: "Available terrains",
    paragraphs: [
      "There are 6 different terrains. One is randomly set when game begins and benefits a family increasing the attack by 1",
      "- Sea buffs 🦈 animals",
      "- Swamp buffs 🐸 animals",
      "- Jungle buffs 🐺 animals",
      "- Desert buffs 🦂 animals",
      "- Mountain buffs 🦅 animals",
      "- Forest buffs 🦎 animals",
    ],
  },
  win: {
    title: "You win!",
    paragraphs: ["Good game!", "Your animals defeated PC, nature always win!"],
    left: "18%",
    top: "35%",
  },
  lose: {
    title: "Computer wins",
    paragraphs: [
      "Nice try!",
      "PC defeated you this time, but nature always takes revenge!",
    ],
    left: "18%",
    top: "35%",
  },
  device: {
    className: "responsive-container",
    title: "Mobile device detected",
    paragraphs: [
      "You could be using Animal Cardom from a mobile device. In that case, we recommend to rotate the screen for a better experience",
    ],
  },
};

interface IProps {
  setShowModal: (val: string) => void;
  sign: keyof typeof modalTexts;
}

export default function SimpleModal({ setShowModal, sign }: IProps) {
  return (
    <Wrapper
      className={modalTexts[sign]?.className}
      top={modalTexts[sign]?.top}
      left={modalTexts[sign]?.left}
    >
      <Text weight="bold">{modalTexts[sign].title}</Text>
      {modalTexts[sign].paragraphs.map((p) => (
        <Text>{p}</Text>
      ))}
      <Button onClick={() => setShowModal("")}>Close</Button>
    </Wrapper>
  );
}

interface WrapperProps {
  left?: string;
  top?: string;
}
interface TextProps {
  weight?: string;
}
const Wrapper = styled.div`
  &.responsive-container {
    @media (${SMALL_RESPONSIVE_BREAK}) {
      width: 80%;
    }
  }
  background: #d4a257;
  border: 2px solid #b9935a;
  border-radius: 5px;
  box-shadow: inset 0px 0px 10px black;
  display: flex;
  flex-direction: column;
  left: ${(p: WrapperProps) => p.left};
  padding: 0 1.3em 0 1.3em;
  position: absolute;
  top: ${(p: WrapperProps) => p.top};
  z-index: 2;
`;
const Text = styled.p`
  font-size: 16px;
  font-weight: ${(p: TextProps) => p.weight};
  text-align: center;
`;
const Button = styled.button`
  border: none;
  background: none;
  color: black;
  cursor: pointer;
  font-size: 10px;
  margin: 0 0 2% 0;
`;
