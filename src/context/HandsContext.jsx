import React, { useReducer } from "react";
import { getCards } from "../data/data.jsx";
export const SELECT_CARD = "SELECT_CARD";
export const COMPUTER_PLAY = "COMPUTER_PLAY";
export const RESTART_GAME = "RESTART_GAME";
export const COMPUTER_THINK = "COMPUTER_THINK";

const Context = React.createContext({});

const initialState = {
  hands: getCards(),
  pcTurn: false,
  triggerPcAttack: false,
  attacker: undefined,
  defender: undefined,
  pcPlay: "",
};

const computerDamage = (state) => {
  const { defender, attacker, pcTurn, hands } = state;
  const statsDiff = defender.life - attacker.attack;
  const pcAnswer = `${attacker.species} attacked ${defender.species}`;
  return {
    ...state,
    hands: {
      user: hands.user.map((card) => {
        if (card === defender) {
          return { ...card, life: statsDiff < 1 ? "DEAD" : statsDiff };
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
  const pcLiveCards = state.hands.pc.filter((card) => card.life !== "DEAD");
  const userLiveCards = state.hands.user.filter((card) => card.life !== "DEAD");

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
  const statsDiff = defender.life - attacker.attack;
  return {
    ...state,
    hands: {
      pc: hands.pc.map((card) => {
        if (card === defender) {
          return { ...card, life: statsDiff < 1 ? "DEAD" : statsDiff };
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
  var { hands, attacker } = state;

  var pcLiveCards = hands.pc.filter((card) => card.life !== "DEAD");
  var userLiveCards = hands.user.filter((card) => card.life !== "DEAD");

  var animal = hands.pc
    .concat(hands.user)
    .find((card) => card.species === species);

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

const reducer = (state, action) => {
  switch (action.type) {
    case SELECT_CARD:
      return selectCard(state, action.species);
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
