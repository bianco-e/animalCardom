const setPoisonedInAHand = (
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

const setParalyzedInAHand = (arr, roundsNumber, animalToTreat) => {
  return arr.map((card) => {
    if (card === animalToTreat) {
      return {
        ...card,
        paralyzed: roundsNumber,
      };
    } else return card;
  });
};

const setAttackInAHand = (arr, attackAmount, animalToTreat) => {
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

const ricinumFn = (state, hand) => {
  const { animalToTreat, hands, usedPlants, selectedPlant } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  if (hands[hand].includes(animalToTreat)) {
    return {
      ...state,
      hands: {
        ...hands,
        [hand]: setPoisonedInAHand(hands[hand], poison, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const aloeFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (
    hands[otherHand].includes(animalToTreat) &&
    animalToTreat.life.current < animalToTreat.life.initial
  ) {
    return {
      ...state,
      hands: {
        ...hands,
        [otherHand]: healCardInAHand(hands[otherHand], 2, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const peyoteFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  if (hands[hand].includes(animalToTreat) && animalToTreat.paralyzed === 0) {
    return {
      ...state,
      hands: {
        ...hands,
        [hand]: setParalyzedInAHand(hands[hand], 1, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
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
    return {
      ...state,
      hands: {
        ...hands,
        [otherHand]: setPoisonedInAHand(
          hands[otherHand],
          poison,
          animalToTreat
        ),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const coffeeFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[otherHand].includes(animalToTreat) && animalToTreat.paralyzed > 0) {
    return {
      ...state,
      hands: {
        ...hands,
        [otherHand]: setParalyzedInAHand(hands[otherHand], 0, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const withaniaFn = (state, hand) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[otherHand].includes(animalToTreat)) {
    return {
      ...state,
      hands: {
        ...hands,
        [otherHand]: setAttackInAHand(hands[otherHand], 1, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
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
