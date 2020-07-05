import React from "react";
import styled from "styled-components";

const SimpleModal = ({ setShowModal }) => {
  return (
    <Wrapper>
      <Text title={true} weight="bold">
        Animal Cardom rules
      </Text>
      <Text>
        You have five different animals cards, and three different plants to
        apply on them if wanted. A terrain will be randomly set at the very
        start.
      </Text>
      <Text>
        Each card has an ability, an attack and life points, and also belongs to
        a family which can give you benefits or not depending on the terrain or
        other cards' abilities.
      </Text>
      <Text>The objective is to kill all opponent's cards.</Text>
      <Text weight="bold">Have fun!</Text>
      <Button onClick={() => setShowModal(false)}>Close</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div({
  width: "25%",
  padding: "0 2em 0 2em",
  zIndex: "2",
  position: "absolute",
  backgroundColor: "#d4a257",
  border: "2px solid #b9935a",
  borderRadius: "5px",
  boxShadow: `inset 0px 0px 10px black`,
  display: "flex",
  flexDirection: "column",
});
const Text = styled.p({
  textAlign: "center",
  fontSize: (props) => props.size || "17px",
  fontWeight: (props) => props.weight,
  fontFamily: (props) => props.title && "Fondamento, cursive",
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
