import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuTitle } from "../components/styled-components";
import MenuLayout from "../components/MenuLayout";
import CollectionFilter from "../components/CollectionFilter";
import Spinner from "../components/Spinner";
import { IAnimal } from "../interfaces";
import { sortCardsAlphabetically } from "../utils";
import Card from "../components/Card";
import {
  getAllAnimalsCards,
  getFilteredAnimalsCards,
} from "../queries/animalsCards";
import { getOwnedCards } from "../queries/user";

export default function Collection() {
  const [speciesFilter, setSpeciesFilter] = useState<string>();
  const [skillTypeFilter, setSkillTypeFilter] = useState<string>();
  const [owningFilter, setOwningFilter] = useState<boolean>();
  const [cardsToShow, setCardsToShow] = useState<IAnimal[]>([]);
  const [ownedCards, setOwnedCards] = useState<IAnimal[]>([]);

  useEffect(() => {
    getAllAnimalsCards().then((res) => {
      if (res && res.animals) {
        setCardsToShow(sortCardsAlphabetically(res.animals));
      }
    });
    getOwnedCards("").then((res) => {
      if (res && res.owned_cards) {
        setOwnedCards(res.owned_cards);
      }
    });
  }, []);

  useEffect(() => {
    const sendingOwnedCards = owningFilter
      ? ownedCards.map(({ name }) => name)
      : undefined;
    getFilteredAnimalsCards(
      speciesFilter,
      skillTypeFilter,
      sendingOwnedCards
    ).then((res) => {
      if (res && res.animals) {
        setCardsToShow(sortCardsAlphabetically(res.animals));
      }
    });
  }, [speciesFilter, skillTypeFilter, owningFilter]);

  const opacityForPreview = "1";

  return (
    <MenuLayout>
      <>
        <CollectionFilter
          setSpeciesFilter={setSpeciesFilter}
          setSkillTypeFilter={setSkillTypeFilter}
          setOwningFilter={setOwningFilter}
        />
        <MenuTitle>Collection</MenuTitle>
        {cardsToShow.length > 0 ? (
          <>
            <CardsContainer>
              {cardsToShow.map((card) => {
                const {
                  attack,
                  bleeding,
                  name,
                  image,
                  life,
                  paralyzed,
                  poisoned,
                  skill,
                  species,
                  targeteable,
                } = card;
                return (
                  <Card
                    attack={attack}
                    belongsToUser={false}
                    bleeding={bleeding}
                    species={species}
                    image={image}
                    key={name}
                    life={life}
                    opacityForPreview={opacityForPreview}
                    paralyzed={paralyzed}
                    poisoned={poisoned}
                    skill={skill}
                    name={name}
                    targeteable={targeteable}
                  ></Card>
                );
              })}
            </CardsContainer>
          </>
        ) : (
          <Spinner />
        )}
      </>
    </MenuLayout>
  );
}

const CardsContainer = styled.div`
  align-items: center;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 60px;
  min-height: 100px;
  padding: 15px 60px;
  width: 83%;
  > button {
    cursor: default;
    height: 270px;
    margin-bottom: 16px;
    width: 19%;
    > .animal-name {
      font-size: 18px;
    }
    &:hover {
      box-shadow: inset 0px 0px 10px rgba(0, 0, 0, 0.6);
      transform: none;
    }
  }
`;
