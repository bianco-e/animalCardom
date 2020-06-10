import React, { useReducer } from "react";
import { getCards, getPlants } from "../data/data.jsx";
export const SELECT_CARD = "SELECT_CARD";
export const COMPUTER_PLAY = "COMPUTER_PLAY";
export const RESTART_GAME = "RESTART_GAME";
export const COMPUTER_THINK = "COMPUTER_THINK";
export const SET_TERRAIN = "SET_TERRAIN";
export const SELECT_PLANT = "SELECT_PLANT";

const Context = React.createContext({});

const initialState = {
  hands: getCards(),
  plants: getPlants(),
  selectedPlant: undefined,
  pcTurn: false,
  triggerPcAttack: false,
  attacker: undefined,
  defender: undefined,
  pcPlay: "",
};

const computerDamage = (state) => {
  const { defender, attacker, pcTurn, hands } = state;
  const statsDiff = defender.life.current - attacker.attack.current;
  const pcAnswer = `${attacker.species} attacked ${defender.species}`;
  return {
    ...state,
    hands: {
      user: hands.user.map((card) => {
        if (card === defender) {
          return {
            ...card,
            life: { ...card.life, current: statsDiff < 1 ? "DEAD" : statsDiff },
          };
        } else {
          return card;
        }
      }),
      pc: hands.pc,
    },
    attacker: undefined,
    defender: undefined,
    pcTurn: !pcTurn,
    triggerPcAttack: false,
    pcPlay: pcAnswer,
  };
};

const computerPlay = (state) => {
  const pcLiveCards = state.hands.pc.filter(
    (card) => card.life.current !== "DEAD"
  );
  const userLiveCards = state.hands.user.filter(
    (card) => card.life.current !== "DEAD"
  );

  const firstRandomNum = Math.floor(Math.random() * pcLiveCards.length);
  const secondRandomNum = Math.floor(Math.random() * userLiveCards.length);

  return computerDamage({
    ...state,
    attacker: pcLiveCards[firstRandomNum],
    defender: userLiveCards[secondRandomNum],
  });
};

const damageEnemy = (state) => {
  const { hands, defender, attacker, pcTurn } = state;
  const statsDiff = defender.life.current - attacker.attack.current;

  return {
    ...state,
    hands: {
      pc: hands.pc.map((card) => {
        if (card === defender) {
          return {
            ...card,
            life: { ...card.life, current: statsDiff < 1 ? "DEAD" : statsDiff },
          };
        } else {
          return card;
        }
      }),
      user: hands.user,
    },
    attacker: undefined,
    defender: undefined,
    pcTurn: !pcTurn,
  };
};

const selectCard = (state, species) => {
  const { hands, attacker, selectedPlant } = state;

  const pcLiveCards = hands.pc.filter((card) => card.life.current !== "DEAD");
  const userLiveCards = hands.user.filter(
    (card) => card.life.current !== "DEAD"
  );

  const animal = hands.pc
    .concat(hands.user)
    .find((card) => card.species === species);

  if (selectedPlant && !attacker) {
    return plantAction({ ...state, animalToTreat: animal });
  }
  if (attacker) {
    if (pcLiveCards.includes(animal)) {
      return damageEnemy({ ...state, defender: animal });
    } else if (attacker === animal) {
      return {
        ...state,
        attacker: undefined,
      };
    } else {
      return state;
    }
  } else if (userLiveCards.includes(animal)) {
    return {
      ...state,
      attacker: animal,
    };
  } else return state;
};

const plantAction = (state) => {
  const { selectedPlant, animalToTreat } = state;
  console.log(selectedPlant, animalToTreat);
  return { ...state, selectedPlant: undefined, animalToTreat: undefined };
};

const selectPlant = (state, plant) => {
  const { plants, selectedPlant } = state;
  if (selectedPlant) {
    if (selectedPlant === plant) {
      return {
        ...state,
        selectedPlant: undefined,
      };
    } else {
      return state;
    }
  } else if (plants.user.includes(plant)) {
    return {
      ...state,
      selectedPlant: plant,
    };
  } else return state;
};

const setTerrain = (state, familyToBuff) => {
  const { hands } = state;
  const pcBuffedCards = hands.pc.map((card) => {
    if (card.family === familyToBuff) {
      return {
        ...card,
        attack: { ...card.attack, current: card.attack.current + 1 },
      };
    } else return card;
  });
  const userBuffedCards = hands.user.map((card) => {
    if (card.family === familyToBuff) {
      return {
        ...card,
        attack: { ...card.attack, current: card.attack.current + 1 },
      };
    } else return card;
  });

  return {
    ...state,
    hands: {
      pc: pcBuffedCards,
      user: userBuffedCards,
    },
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_TERRAIN:
      return setTerrain(state, action.familyToBuff);
    case SELECT_CARD:
      return selectCard(state, action.species);
    case SELECT_PLANT:
      return selectPlant(state, action.plant);
    case COMPUTER_PLAY:
      return computerPlay(state);
    case COMPUTER_THINK:
      return {
        ...state,
        triggerPcAttack: true,
        pcPlay: "Thinking...",
      };
    case RESTART_GAME:
      return initialState;
    default:
      return state;
  }
};

export const HandsContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Context;
