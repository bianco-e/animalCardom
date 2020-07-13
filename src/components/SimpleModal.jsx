import React from "react";
import styled from "styled-components";

const SimpleModal = ({ setShowModal, sign, width }) => {
  const modalsText = {
    rules: {
      title: "Animal Cardom rules",
      paragraphs: [
        "You have five different animals cards, and three different plants to apply on them if wanted. A terrain will be randomly set at the very start.",
        "Each card has an ability, an attack and life points, and also belongs to a family which can give you benefits or not depending on the terrain or other cards' abilities.",
        "The objective is to kill all opponent's cards.",
        "Have fun!",
      ],
    },
    win: {
      title: "You win!",
      paragraphs: [
        "Good game!",
        "Your animals defeated PC, nature always win!",
      ],
    },
    lose: {
      title: "Computer wins",
      paragraphs: [
        "Nice try!",
        "PC defeated you this time, but nature always takes revenge!",
      ],
    },
    device: {
      title: "Mobile device detected",
      paragraphs: [
        "You could be using Animal Cardom from a mobile device. In that case, we recommend to rotate the screen for a better experience",
      ],
    },
  };

  return (
    <Wrapper
      width={width}
      top={(sign === "win" || sign === "lose") && "35%"}
      left={(sign === "win" || sign === "lose") && "18%"}
    >
      <Text fFamily="Fondamento, cursive" weight="bold">
        {modalsText[sign].title}
      </Text>
      {modalsText[sign].paragraphs.map((p) => (
        <Text>{p}</Text>
      ))}
      <Button
        onClick={() => {
          setShowModal(false);
        }}
      >
        Close
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  width: (props) => props.width || "25%",
  padding: "0 1.3em 0 1.3em",
  zIndex: "2",
  position: "absolute",
  top: (props) => props.top,
  left: (props) => props.left,
  backgroundColor: "#d4a257",
  border: "2px solid #b9935a",
  borderRadius: "5px",
  boxShadow: `inset 0px 0px 10px black`,
  display: "flex",
  flexDirection: "column",
});
const Text = styled.p({
  textAlign: "center",
  fontSize: "16px",
  fontFamily: (props) => props.fFamily,
});
const Button = styled.button({
  border: "none",
  background: "none",
  color: "black",
  cursor: "pointer",
  fontSize: "10px",
  margin: "0 0 2% 0",
});

export default SimpleModal;
