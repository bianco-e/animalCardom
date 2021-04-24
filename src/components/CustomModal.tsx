import React, { useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { SMALL_RESPONSIVE_BREAK } from "../utils/constants";

interface ModalTexts {
  nameError: Sign;
  rules: Sign;
  terrains: Sign;
  win: Sign;
  lose: Sign;
  device: Sign;
  loading: Sign;
}

interface Sign {
  className?: string;
  title: string;
  paragraphs: string[];
  top?: string;
  left?: string;
}

const modalRoot = document.getElementById("modal-root");

const modalTexts: ModalTexts = {
  loading: {
    title: "spinner",
    paragraphs: [""],
  },
  nameError: {
    title: "Nameless people are not allowed in Animal Cardom!",
    paragraphs: ["Please enter a name and try to play again"],
  },
  rules: {
    className: "responsive-container",
    title: "Animal Cardom rules",
    paragraphs: [
      "You have five different animals cards, and three different plants to apply on them if wanted. A terrain will be randomly set at the very start.",
      "Each card has an ability, an attack and life points, and also belongs to a species which can give you benefits or not depending on the terrain or other cards' abilities.",
      "The objective is to kill all opponent's cards.",
      "Have fun!",
    ],
  },
  terrains: {
    className: "responsive-container",
    title: "Available terrains",
    paragraphs: [
      "There are 6 different terrains. One is randomly set when game begins and benefits a species increasing attack by 1",
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
  },
  lose: {
    title: "Computer wins",
    paragraphs: [
      "Nice try!",
      "PC defeated you this time, but nature always takes revenge!",
    ],
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
  const contentRef = useRef<HTMLDivElement>(null);
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setShowModal("");
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    const { clientX, clientY } = e;
    if (contentRef.current) {
      const isClickingOut =
        clientX >
          contentRef.current.offsetLeft + contentRef.current.offsetWidth ||
        clientX < contentRef.current.offsetLeft ||
        clientY >
          contentRef.current.offsetTop + contentRef.current.offsetHeight ||
        clientY < contentRef.current.offsetTop;
      if (isClickingOut) {
        setShowModal("");
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    modalRoot &&
    ReactDOM.createPortal(
      <Wrapper className={modalTexts[sign]?.className}>
        <Content ref={contentRef}>
          <Text weight="bold">{modalTexts[sign].title}</Text>
          {modalTexts[sign].paragraphs.map((p) => (
            <Text>{p}</Text>
          ))}
          <Button onClick={() => setShowModal("")}>Close</Button>
        </Content>
      </Wrapper>,
      modalRoot
    )
  );
}

interface TextProps {
  weight?: string;
}
const Wrapper = styled.div`
  background: rgba(50, 50, 50, 0.7);
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: 100%;
`;
const Content = styled.div`
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
  padding: 0 1.3em 0 1.3em;
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
