import { useEffect, useState } from "react";
import styled from "styled-components";
import { MenuTitle, Message } from "../components/styled-components";
import { IAnimal } from "../interfaces";
import { getCookie, sortCardsAlphabetically } from "../utils";
import { getUserProfile } from "../queries/user";
import {
  getAllAnimalsCards,
  getFilteredAnimalsCards,
} from "../queries/animalsCards";
import MenuLayout from "../components/MenuLayout";
import CollectionFilter from "../components/CollectionFilter";
import Spinner from "../components/Spinner";
import Card from "../components/Card";
import CustomModal from "../components/CustomModal";
import ModalHandEditContent from "../components/ModalHandEditContent";

const getCardOpacityForPreview = (cards: string[], name: string): string => {
  if (cards.find((card) => card === name)) {
    return "1";
  }
  return "0.6";
};

export default function Collection() {
  const [speciesFilter, setSpeciesFilter] = useState<string>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [skillTypeFilter, setSkillTypeFilter] = useState<string>();
  const [owningFilter, setOwningFilter] = useState<boolean | undefined>();
  const [cardsToShow, setCardsToShow] = useState<IAnimal[]>([]);
  const [allCards, setAllCards] = useState<IAnimal[]>([]);
  const [currentHand, setCurrentHand] = useState<string[]>([]);
  const [ownedCards, setOwnedCards] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [animalToAdd, setAnimalToAdd] = useState<IAnimal>();

  useEffect(() => {
    setIsLoading(true);
    getAllAnimalsCards().then((res) => {
      setIsLoading(false);
      if (res && res.animals) {
        setAllCards(res.animals);
        setCardsToShow(sortCardsAlphabetically(res.animals));
      }
    });
    const authId = getCookie("auth=");
    if (authId) {
      getUserProfile(authId).then((res) => {
        if (res && res.owned_cards && res.hand) {
          setOwnedCards(res.owned_cards);
          setCurrentHand(res.hand);
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

  const handleClick = (name: string) => {
    setShowModal(true);
    const cardToAdd = allCards.find((card) => card.name === name);
    if (cardToAdd) {
      setAnimalToAdd(cardToAdd);
    }
  };

  const hand = allCards.filter((card) => currentHand.includes(card.name));

  return (
    <MenuLayout>
      <>
        <CollectionFilter
          setSpeciesFilter={setSpeciesFilter}
          setSkillTypeFilter={setSkillTypeFilter}
          setOwningFilter={setOwningFilter}
        />
        <MenuTitle>Hand</MenuTitle>
        {!(currentHand.length > 0) ? (
          <Spinner />
        ) : (
          <CardsContainer>
            {hand.map((card) => {
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
                  opacityForPreview="1"
                  paralyzed={paralyzed}
                  poisoned={poisoned}
                  skill={skill}
                  name={name}
                  targeteable={targeteable}
                ></Card>
              );
            })}
          </CardsContainer>
        )}

        <MenuTitle>
          Collection <i>Click an owned animal to add to your hand</i>
        </MenuTitle>
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
                  onPreviewClick={
                    ownedCards.includes(name) && !currentHand.includes(name)
                      ? handleClick
                      : undefined
                  }
                  opacityForPreview={getCardOpacityForPreview(ownedCards, name)}
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
        {showModal && (
          <CustomModal
            closeModal={() => setShowModal(false)}
            contentWidth="950px"
            withCloseButton={false}
          >
            <ModalHandEditContent
              closeModal={() => setShowModal(false)}
              hand={hand}
              animalToAdd={animalToAdd!}
              handSetter={setCurrentHand}
            />
          </CustomModal>
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
