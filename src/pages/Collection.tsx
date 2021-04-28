import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuTitle, Message } from "../components/styled-components";
import MenuLayout from "../components/MenuLayout";
import CollectionFilter from "../components/CollectionFilter";
import Spinner from "../components/Spinner";
import { IAnimal } from "../interfaces";
import { getCookie, sortCardsAlphabetically } from "../utils";
import Card from "../components/Card";
import {
  getAllAnimalsCards,
  getFilteredAnimalsCards,
} from "../queries/animalsCards";
import { getUserProfile } from "../queries/user";

export default function Collection() {
  const [speciesFilter, setSpeciesFilter] = useState<string>();
  const [skillTypeFilter, setSkillTypeFilter] = useState<string>();
  const [owningFilter, setOwningFilter] = useState<boolean | undefined>();
  const [cardsToShow, setCardsToShow] = useState<IAnimal[]>([]);
  const [ownedCards, setOwnedCards] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getCardOpacity = (name: string): string => {
    if (ownedCards.find((card) => card === name)) {
      return "1";
    }
    return "0.6";
  };

  useEffect(() => {
    setIsLoading(true);
    getAllAnimalsCards().then((res) => {
      setIsLoading(false);
      if (res && res.animals) {
        setCardsToShow(sortCardsAlphabetically(res.animals));
      }
    });
    const authId = getCookie("auth=");
    if (authId) {
      getUserProfile(authId).then((res) => {
        if (res && res.owned_cards) {
          setOwnedCards(res.owned_cards);
        }
      });
    }
  }, []);

  useEffect(() => {
    const sendingOwnedCards = owningFilter
      ? ownedCards.map((card) => card)
      : undefined;
    const sendingOwnedCardsToFilter =
      owningFilter === false ? ownedCards.map((card) => card) : undefined;
    getFilteredAnimalsCards(
      speciesFilter,
      skillTypeFilter,
      sendingOwnedCards,
      sendingOwnedCardsToFilter
    ).then((res) => {
      if (res && res.animals) {
        setCardsToShow(sortCardsAlphabetically(res.animals));
      }
    });
  }, [speciesFilter, skillTypeFilter, owningFilter]); //eslint-disable-line

  return (
    <MenuLayout>
      <>
        <CollectionFilter
          setSpeciesFilter={setSpeciesFilter}
          setSkillTypeFilter={setSkillTypeFilter}
          setOwningFilter={setOwningFilter}
        />
        <MenuTitle>Collection</MenuTitle>
        {isLoading ? (
          <Spinner />
        ) : cardsToShow.length > 0 ? (
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
                  opacityForPreview={getCardOpacity(name)}
                  paralyzed={paralyzed}
                  poisoned={poisoned}
                  skill={skill}
                  name={name}
                  targeteable={targeteable}
                ></Card>
              );
            })}
          </CardsContainer>
        ) : (
          <Message margin="75px 0 0 0">No animals found.</Message>
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
