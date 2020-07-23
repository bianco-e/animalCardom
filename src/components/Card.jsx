import React, { useContext, Fragment } from "react";
import styled from "styled-components";
import { utilitiesIcons } from "../data/data.jsx";
import Context, { SELECT_CARD } from "../context/HandsContext";
import Media from "react-media";

const Card = ({
  attack,
  life,
  family,
  image,
  skill,
  species,
  poisoned,
  paralyzed,
  targeteable,
  bleeding,
}) => {
  const [state, dispatch] = useContext(Context);

  return (
    <>
      <Media
        queries={{
          sm: "(max-width: 850px)",
          med: "(max-width: 1150px)",
        }}
      >
        {(matches) => (
          <Fragment>
            <AnimalCard
              onClick={() => {
                !state.pcTurn && dispatch({ type: SELECT_CARD, species });
              }}
              opacity={`${life.current === "DEAD" && "0.5"}`}
              outline={`${
                state.attacker?.species === species &&
                "7px inset rgba(255, 129, 3, .8)"
              }`}
              padding={matches.sm ? "6px" : matches.med && "9px"}
            >
              <CornerIcon
                fSize={matches.sm ? "16" : matches.med && "20px"}
                leftDist="3px"
              >
                {family}
              </CornerIcon>
              <CornerIcon
                fSize={matches.sm ? "16" : matches.med && "20px"}
                leftDist={
                  matches.sm ? "118px" : matches.med ? "147px" : "185px"
                }
              >
                {!targeteable && "🚫"}
              </CornerIcon>
              {bleeding && (
                <CornerIcon
                  fSize={matches.sm ? "16" : matches.med && "20px"}
                  leftDist={
                    matches.sm ? "118px" : matches.med ? "147px" : "185px"
                  }
                >
                  <Picture
                    width={matches.sm ? "17" : matches.med ? "20" : "25"}
                    height={matches.sm ? "17" : matches.med ? "20" : "25"}
                    src={utilitiesIcons.blood}
                  />
                </CornerIcon>
              )}

              <Text fSize={matches.sm ? "13px" : matches.med ? "15px" : "20px"}>
                {species}
              </Text>

              <Picture
                width={matches.sm ? "110" : matches.med ? "130" : "170"}
                height={matches.sm ? "80" : matches.med ? "90" : "120"}
                src={image}
                shadow="0px 0px 9px black"
              />

              <DescriptionDiv
                width={matches.sm ? "115px" : matches.med && "145px"}
              >
                <FlexSection>
                  <Picture
                    width={matches.sm ? "15" : matches.med ? "17" : "20"}
                    height={matches.sm ? "15" : matches.med ? "17" : "20"}
                    src={utilitiesIcons.fury}
                  />
                  <Text
                    fSize={matches.sm ? "9px" : matches.med ? "10px" : "12px"}
                    textDeco={`${paralyzed > 0 && "line-through 1px red"}`}
                  >
                    {skill.name}
                  </Text>
                </FlexSection>
                <Text
                  fSize={matches.sm ? "8px" : matches.med ? "9px" : "10px"}
                  textDeco={`${paralyzed > 0 && "line-through 1px red"}`}
                >
                  {skill.description}
                </Text>
              </DescriptionDiv>

              <FlexSection>
                <Picture
                  width={matches.sm ? "15" : matches.med ? "17" : "20"}
                  height={matches.sm ? "15" : matches.med ? "17" : "20"}
                  src={utilitiesIcons.attack}
                />
                <Text
                  fSize={matches.sm ? "12px" : matches.med ? "13px" : "16px"}
                  color={`${
                    attack.current > attack.initial
                      ? "green"
                      : attack.current < attack.initial && "red"
                  }`}
                >
                  {attack.current}
                </Text>

                {poisoned.rounds === 0 ? (
                  <Text
                    fSize={matches.sm ? "12px" : matches.med && "13px"}
                    margin={"2px"}
                  >
                    🖤
                  </Text>
                ) : (
                  <Text
                    fSize={matches.sm ? "12px" : matches.med && "13px"}
                    margin={"2px"}
                  >
                    💚
                  </Text>
                )}

                <Text
                  fSize={matches.sm ? "12px" : matches.med ? "13px" : "16px"}
                  color={`${
                    life.current > life.initial
                      ? "green"
                      : life.current < life.initial && "red"
                  }`}
                >
                  {life.current}
                </Text>
              </FlexSection>
            </AnimalCard>
          </Fragment>
        )}
      </Media>
    </>
  );
};

const AnimalCard = styled.button({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
  border: "2px solid #b9935a",
  borderRadius: "5px",
  cursor: "pointer",
  position: "relative",
  padding: (props) => props.padding || "12px",
  backgroundColor: "#d4a257",
  boxShadow: `inset 0px 0px 10px black`,
  outline: (props) => props.outline,
  opacity: (props) => props.opacity,
  ["&:hover"]: {
    boxShadow: "4px 4px 4px #b9935a, inset 0px 0px 15px black",
  },
  ["&:active"]: {
    boxShadow: "inset 0px 0px 40px black",
  },
});
const CornerIcon = styled.span({
  fontSize: (props) => props.fSize || "25px",
  position: "absolute",
  top: "3px",
  left: (props) => props.leftDist,
});
const Picture = styled.img({
  width: (props) => `${props.width}px`,
  height: (props) => `${props.height}px`,
  borderRadius: "120px",
  boxShadow: (props) => props.shadow,
});
const Text = styled.h3({
  color: (props) => props.color,
  fontSize: (props) => props.fSize || "14px",
  margin: (props) => props.margin || "0",
  textAlign: "center",
  textDecoration: (props) => props.textDeco,
});
const FlexSection = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});
const DescriptionDiv = styled.div({
  marginTop: "4px",
  width: (props) => props.width || "180px",
  height: "60px",
  padding: "5px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  backgroundColor: "#b9935a",
  boxShadow: "inset 0px 0px 10px #e3cdac",
  borderRadius: "5px",
});

export default Card;
