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

const getRandomIdx = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const getLiveCards = (arr) => {
  return arr.filter((card) => card.life.current !== "DEAD");
};
const sortHandByAttack = (hand) => {
  return hand.sort((a, b) => a.attack.current < b.attack.current);
};

const attackAndApplySkill = (state, hand) => {
  const { defender, attacker, hands } = state;
  const statsDiff = defender.life.current - attacker.attack.current;
  const newState = {
    ...state,
    hands: {
      ...hands,
      [hand]: restRoundAndBleedingDmg(
        applyPoisonDamage(applyAttackDamage(hands[hand], statsDiff, defender))
      ),
    },
  };
  return attacker.paralyzed > 0
    ? newState
    : attacker.skill.toDo(newState, hand);
};

const applyPlantToCard = (plant, card, state, hand) => {
  const plantMessage =
    hand === "user" ? ` and used ${plant.name} on ${card.species}` : "";
  if (card.targeteable) {
    return plant.toDo(
      {
        ...state,
        selectedPlant: plant,
        animalToTreat: card,
        pcPlay: state.pcPlay + plantMessage,
      },
      hand
    );
  } else return state;
};

const checkWhatPlantToUse = (state) => {
  const { plants, usedPlants, hands } = state;
  const pcLiveCards = getLiveCards(hands.pc);
  const userLiveCards = getLiveCards(hands.user);

  const damagedCard = pcLiveCards.find(
    (card) => card.life.current <= card.life.initial - 2
  );
  const poisonedCard = pcLiveCards.find((card) => card.poisoned.rounds > 0);
  const paralyzedCard = pcLiveCards.find((card) => card.paralyzed > 0);

  const findAPlant = (plantName) => {
    return plants.pc.find(
      (plant) => plant.name === plantName && !usedPlants.includes(plant)
    );
  };
  const aloePlant = findAPlant("Aloe");
  const jewelweedPlant = findAPlant("Jewelweed");
  const coffeePlant = findAPlant("Coffee");
  const withaniaPlant = findAPlant("Withania");
  const peyotePlant = findAPlant("Peyote");
  const ricinumPlant = findAPlant("Ricinum");
  const randomNum = Math.floor(Math.random() * 10);
  const randomAlly = getRandomIdx(pcLiveCards);
  const randomEnemy = getRandomIdx(userLiveCards);

  if (damagedCard && aloePlant) {
    return applyPlantToCard(aloePlant, damagedCard, state, "user");
  } else if (poisonedCard && jewelweedPlant) {
    return applyPlantToCard(jewelweedPlant, poisonedCard, state, "user");
  } else if (paralyzedCard && coffeePlant) {
    return applyPlantToCard(coffeePlant, paralyzedCard, state, "user");
  } else if (randomNum > 3 && withaniaPlant) {
    return applyPlantToCard(withaniaPlant, randomAlly, state, "user");
  } else if (randomNum > 3 && peyotePlant) {
    return applyPlantToCard(peyotePlant, randomEnemy, state, "user");
  } else if (randomNum > 3 && ricinumPlant) {
    return applyPlantToCard(ricinumPlant, randomEnemy, state, "user");
  } else return state;
};

const computerDamage = (state) => {
  const { defender, attacker, pcTurn } = state;
  const pcAnswer = `${attacker.species} attacked ${defender.species}`;
  const newState = attackAndApplySkill(state, "user");

  return checkWhatPlantToUse({
    ...newState,
    attacker: undefined,
    defender: undefined,
    pcTurn: !pcTurn,
    triggerPcAttack: false,
    pcPlay: pcAnswer,
  });
};

const computerPlay = (state) => {
  const { hands } = state;
  const pcLiveCards = getLiveCards(hands.pc);
  const userLiveCards = hands.user.filter(
    (card) => card.life.current !== "DEAD" && card.targeteable
  );
  return computerDamage({
    ...state,
    attacker: sortHandByAttack(pcLiveCards)[0],
    defender: sortHandByAttack(userLiveCards)[0],
  });
};

const damageEnemy = (state) => {
  const newState = attackAndApplySkill(state, "pc");
  return getLiveCards(newState.hands.pc).length === 0
    ? {
        ...newState,
        attacker: undefined,
        defender: undefined,
      }
    : {
        ...newState,
        attacker: undefined,
        defender: undefined,
        pcTurn: !state.pcTurn,
      };
};

const selectCard = (state, species) => {
  const { hands, attacker, selectedPlant } = state;
  const pcLiveCards = getLiveCards(hands.pc);
  const userLiveCards = getLiveCards(hands.user);
  const animal = hands.pc
    .concat(hands.user)
    .find((card) => card.species === species);

  if (selectedPlant && !attacker) {
    return applyPlantToCard(selectedPlant, animal, state, "pc");
  }
  if (attacker) {
    if (pcLiveCards.includes(animal) && animal.targeteable) {
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
  if (selectedPlant && selectedPlant.name === plant.name) {
    return {
      ...state,
      selectedPlant: undefined,
    };
  } else if (plants.user.includes(plant) && !attacker) {
    return {
      ...state,
      selectedPlant: plant,
    };
  } else return state;
};

const restRoundAndBleedingDmg = (arr) => {
  const restParalyzedRound = arr.map((card) => {
    if (card.paralyzed > 0) {
      return {
        ...card,
        paralyzed: card.paralyzed - 1,
      };
    } else return card;
  });
  const restPoisonedRound = restParalyzedRound.map((card) => {
    if (card.poisoned.rounds > 0) {
      return {
        ...card,
        poisoned: {
          ...card.poisoned,
          rounds: card.poisoned.rounds - 1,
        },
      };
    } else return card;
  });
  return restPoisonedRound.map((card) => {
    if (card.bleeding && card.life.current !== "DEAD") {
      return {
        ...card,
        life: {
          ...card.life,
          current: card.life.current - 1 < 1 ? "DEAD" : card.life.current - 1,
        },
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
