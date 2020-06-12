import React, { useReducer } from "react";
import { getCards, getPlants } from "../data/data.jsx";
export const SELECT_CARD = "SELECT_CARD";
export const COMPUTER_PLAY = "COMPUTER_PLAY";
export const RESTART_GAME = "RESTART_GAME";
export const COMPUTER_THINK = "COMPUTER_THINK";
export const SET_TERRAIN = "SET_TERRAIN";
export const SELECT_PLANT = "SELECT_PLANT";

const Context = React.createContext({});

const newGame = () => {
  return {
    hands: getCards(),
    plants: getPlants(),
    selectedPlant: undefined,
    usedPlants: [],
    attacker: undefined,
    defender: undefined,
    pcTurn: false,
    triggerPcAttack: false,
    pcPlay: "",
  };
};

const initialState = newGame();

const attackAndApplySkill = (state, hand) => {
  const { defender, attacker, hands } = state;
  const statsDiff = defender.life.current - attacker.attack.current;
  const newState = {
    ...state,
    hands: {
      ...hands,
      [hand]: restParalyzedRound(
        applyPoisonDamage(applyAttackDamage(hands[hand], statsDiff, defender))
      ),
    },
  };
  return attacker.paralyzed > 0
    ? newState
    : attacker.skill.toDo(newState, hand);
};

const computerDamage = (state) => {
  const { defender, attacker, pcTurn } = state;
  const pcAnswer = `${attacker.species} attacked ${defender.species}`;
  const newState = attackAndApplySkill(state, "user");
  return {
    ...newState,
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
  const newState = attackAndApplySkill(state, "pc");
  return {
    ...newState,
    attacker: undefined,
    defender: undefined,
    pcTurn: !state.pcTurn,
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
    return selectedPlant.toDo({ ...state, animalToTreat: animal });
  }
  if (attacker) {
    if (pcLiveCards.includes(animal)) {
      return damageEnemy({ ...state, defender: animal });
    } else if (attacker.species === animal.species) {
      return {
        ...state,
        attacker: undefined,
      };
    } else return state;
  } else if (userLiveCards.includes(animal)) {
    return {
      ...state,
      attacker: animal,
    };
  } else return state;
};

const selectPlant = (state, plant) => {
  const { plants, selectedPlant, attacker } = state;
  if (selectedPlant) {
    if (selectedPlant.name === plant.name) {
      return {
        ...state,
        selectedPlant: undefined,
      };
    } else return state;
  } else if (plants.user.includes(plant) && !attacker) {
    return {
      ...state,
      selectedPlant: plant,
    };
  } else return state;
};

const restParalyzedRound = (arr) => {
  return arr.map((card) => {
    if (card.paralyzed > 0) {
      return {
        ...card,
        paralyzed: card.paralyzed - 1,
      };
    } else return card;
  });
};

const applyAttackDamage = (arr, statsDiff, defender) => {
  return arr.map((card) => {
    if (card.species === defender.species) {
      return {
        ...card,
        life: {
          ...card.life,
          current: statsDiff < 1 ? "DEAD" : statsDiff,
        },
      };
    } else {
      return card;
    }
  });
};

const applyPoisonDamage = (arr) => {
  return arr.map((card) => {
    if (card.poisoned.rounds > 0 && card.life.current !== "DEAD") {
      return {
        ...card,
        life: {
          ...card.life,
          current:
            card.life.current - card.poisoned.damage < 1
              ? "DEAD"
              : card.life.current - card.poisoned.damage,
        },
        poisoned: {
          ...card.poisoned,
          rounds: card.poisoned.rounds - 1,
        },
      };
    } else return card;
  });
};

const setTerrain = (state, familyToBuff) => {
  const buffCards = (arr) => {
    return arr.map((card) => {
      if (card.family === familyToBuff) {
        return {
          ...card,
          attack: { ...card.attack, current: card.attack.current + 1 },
        };
      } else return card;
    });
  };
  return {
    ...state,
    hands: {
      pc: buffCards(state.hands.pc),
      user: buffCards(state.hands.user),
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
      return newGame();
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
