const poisonCardInAHand = (
  arr,
  { damageAmount, roundsNumber },
  animalToTreat
) => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        poisoned: {
          damage: damageAmount,
          rounds: roundsNumber,
        },
      };
    } else return card;
  });
};

const healCardInAHand = (arr, amountToHeal, animalToTreat) => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        life: {
          ...card.life,
          current:
            card.life.current + amountToHeal > card.life.initial
              ? card.life.initial
              : card.life.current + amountToHeal,
        },
      };
    } else return card;
  });
};

const paralyzeCardInAHand = (arr, roundsNumber, animalToTreat) => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        paralyzed: roundsNumber,
      };
    } else return card;
  });
};

const setCardAttackInAHand = (arr, attackAmount, animalToTreat) => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        attack: {
          ...card.attack,
          current: card.attack.current + attackAmount,
        },
      };
    } else return card;
  });
};

const setHandInState = (state, hand, newHand) => {
  const { hands, usedPlants, selectedPlant } = state;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: newHand,
    },
    animalToTreat: undefined,
    selectedPlant: undefined,
    usedPlants: [...usedPlants, selectedPlant],
  };
};

const ricinumFn = (state, hand) => {
  const { animalToTreat, hands } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  if (hands[hand].includes(animalToTreat)) {
    const newHand = poisonCardInAHand(hands[hand], poison, animalToTreat);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const aloeFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (
    hands[otherHand].includes(animalToTreat) &&
    animalToTreat.life.current < animalToTreat.life.initial
  ) {
    const newHand = healCardInAHand(hands[otherHand], 2, animalToTreat);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const peyoteFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  if (hands[hand].includes(animalToTreat) && animalToTreat.paralyzed === 0) {
    const newHand = paralyzeCardInAHand(hands[hand], 1, animalToTreat);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const jewelweedFn = (state, hand) => {
  const { animalToTreat, hands, usedPlants, selectedPlant } = state;
  const poison = { damageAmount: 0, roundsNumber: 0 };
  const otherHand = hand === "pc" ? "user" : "pc";
  if (
    hands[otherHand].includes(animalToTreat) &&
    animalToTreat.poisoned.rounds > 0
  ) {
    const newHand = poisonCardInAHand(hands[otherHand], poison, animalToTreat);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const coffeeFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[otherHand].includes(animalToTreat) && animalToTreat.paralyzed > 0) {
    const newHand = paralyzeCardInAHand(hands[otherHand], 0, animalToTreat);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const withaniaFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[otherHand].includes(animalToTreat)) {
    const newHand = setCardAttackInAHand(hands[otherHand], 1, animalToTreat);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const plantsFunctions = {
  ricinumFn,
  aloeFn,
  peyoteFn,
  jewelweedFn,
  coffeeFn,
  withaniaFn,
};

export default plantsFunctions;
