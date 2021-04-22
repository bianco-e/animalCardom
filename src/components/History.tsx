import React from "react";
import styled from "styled-components";
import CardThumbnail from "./CardThumbnail";
import PlantThumbnail from "./PlantThumbnail";
import { cardSpeciesToLowerCase } from "../utils";
const lastTenGames = [
  {
    won: true,
    usedCards: {
      own: [
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Lion",
          survived: false,
        },
        {
          species: "Mosquito",
          survived: true,
        },
        {
          species: "Gorilla",
          survived: true,
        },
        {
          species: "Electric Eel",
          survived: true,
        },
      ],
      pc: [
        {
          species: "Shark",
          survived: true,
        },
        {
          species: "Bear",
          survived: true,
        },
        {
          species: "Toad",
          survived: true,
        },
        {
          species: "Salamander",
          survived: true,
        },
        {
          species: "Cheetah",
          survived: false,
        },
      ],
    },
    usedPlants: {
      own: [
        {
          name: "Withania",
          applied: true,
        },
        {
          name: "Coffee",
          applied: false,
        },
        {
          name: "Peyote",
          applied: true,
        },
      ],
      pc: [
        {
          name: "Jewelweed",
          applied: true,
        },
        {
          name: "Aloe",
          applied: true,
        },
        {
          name: "Ricinum",
          applied: false,
        },
      ],
    },
  },
  {
    won: true,
    usedCards: {
      own: [
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: false,
        },
      ],
      pc: [
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: false,
        },
      ],
    },
    usedPlants: {
      own: [
        {
          name: "Withania",
          applied: true,
        },
        {
          name: "Coffee",
          applied: false,
        },
        {
          name: "Peyote",
          applied: true,
        },
      ],
      pc: [
        {
          name: "Jewelweed",
          applied: true,
        },
        {
          name: "Aloe",
          applied: true,
        },
        {
          name: "Ricinum",
          applied: false,
        },
      ],
    },
  },
  {
    won: false,
    usedCards: {
      own: [
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: true,
        },
      ],
      pc: [
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: false,
        },
      ],
    },
    usedPlants: {
      own: [
        {
          name: "Withania",
          applied: true,
        },
        {
          name: "Coffee",
          applied: false,
        },
        {
          name: "Peyote",
          applied: true,
        },
      ],
      pc: [
        {
          name: "Jewelweed",
          applied: true,
        },
        {
          name: "Aloe",
          applied: true,
        },
        {
          name: "Ricinum",
          applied: false,
        },
      ],
    },
  },
  {
    won: true,
    usedCards: {
      own: [
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
      ],
      pc: [
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: false,
        },
      ],
    },
    usedPlants: {
      own: [
        {
          name: "Withania",
          applied: true,
        },
        {
          name: "Coffee",
          applied: false,
        },
        {
          name: "Peyote",
          applied: true,
        },
      ],
      pc: [
        {
          name: "Jewelweed",
          applied: true,
        },
        {
          name: "Aloe",
          applied: true,
        },
        {
          name: "Ricinum",
          applied: false,
        },
      ],
    },
  },
  {
    won: false,
    usedCards: {
      own: [
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: false,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
      ],
      pc: [
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
        {
          species: "Elephant",
          survived: true,
        },
      ],
    },
    usedPlants: {
      own: [
        {
          name: "Withania",
          applied: true,
        },
        {
          name: "Coffee",
          applied: false,
        },
        {
          name: "Peyote",
          applied: true,
        },
      ],
      pc: [
        {
          name: "Jewelweed",
          applied: true,
        },
        {
          name: "Aloe",
          applied: true,
        },
        {
          name: "Ricinum",
          applied: false,
        },
      ],
    },
  },
];

export default function History() {
  return (
    <Wrapper>
      {lastTenGames.map((game, idx) => {
        const { won, usedCards, usedPlants } = game;
        return (
          <HistoryCard key={idx}>
            <Result bgColor={won ? "green" : "red"}>
              {won ? "Won" : "Lost"}
            </Result>
            <PlayerStats>
              <b>You</b>
              <CardsContainer>
                {usedCards.own.map((card) => {
                  return (
                    <CardThumbnail
                      key={card.species}
                      disabled={!card.survived}
                      image={`/images/animals/adult-${cardSpeciesToLowerCase(
                        card.species
                      )}.webp`}
                      species={card.species}
                    ></CardThumbnail>
                  );
                })}
              </CardsContainer>
              <CardsContainer>
                {usedPlants.own.map((plant) => {
                  return (
                    <PlantThumbnail
                      key={plant.name}
                      disabled={!plant.applied}
                      image={`/images/plants/${plant.name.toLowerCase()}.webp`}
                      name={plant.name}
                    ></PlantThumbnail>
                  );
                })}
              </CardsContainer>
            </PlayerStats>
            <PlayerStats>
              <b>PC</b>
              <CardsContainer>
                {usedCards.pc.map((card) => {
                  return (
                    <CardThumbnail
                      key={card.species}
                      disabled={!card.survived}
                      image={`/images/animals/adult-${cardSpeciesToLowerCase(
                        card.species
                      )}.webp`}
                      species={card.species}
                    ></CardThumbnail>
                  );
                })}
              </CardsContainer>
              <CardsContainer>
                {usedPlants.pc.map((plant) => {
                  return (
                    <PlantThumbnail
                      key={plant.name}
                      disabled={!plant.applied}
                      image={`/images/plants/${plant.name.toLowerCase()}.webp`}
                      name={plant.name}
                    ></PlantThumbnail>
                  );
                })}
              </CardsContainer>
            </PlayerStats>
          </HistoryCard>
        );
      })}
    </Wrapper>
  );
}

interface ResultProps {
  bgColor?: string;
}
const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  width: 100%;
  overflow-y: auto;
`;
const HistoryCard = styled.div`
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 10px 10px rgba(95, 57, 0, 0.2);
  display: flex;
  min-height: 80px;
  margin: 15px 0;
  padding: 15px 60px;
  position: relative;
  width: 75%;
`;
const PlayerStats = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 50%;
  > b {
    margin-bottom: 10px;
  }
`;
const CardsContainer = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 10px;
  justify-content: space-around;
  width: 85%;
`;
const Result = styled.span`
  background: ${(p: ResultProps) => p.bgColor};
  border-radius: 5px;
  color: #fff;
  font-size: 14px;
  font-weight: bold;
  padding: 2px 10px;
  position: absolute;
  transform: rotate(-30deg);
  left: -2px;
  top: 8px;
`;
