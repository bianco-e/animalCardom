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

const ricinumFn = (state) => {
  const { animalToTreat, hands, usedPlants, selectedPlant } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  if (hands.pc.includes(animalToTreat)) {
    return {
      ...state,
      hands: {
        ...hands,
        pc: setPoisonedInAHand(hands.pc, poison, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const aloeFn = (state) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  if (
    hands.user.includes(animalToTreat) &&
    animalToTreat.life.current < animalToTreat.life.initial
  ) {
    return {
      ...state,
      hands: { ...hands, user: healCardInAHand(hands.user, 2, animalToTreat) },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const peyoteFn = (state) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  if (hands.pc.includes(animalToTreat) && animalToTreat.paralyzed === 0) {
    return {
      ...state,
      hands: { ...hands, pc: setParalyzedInAHand(hands.pc, 1, animalToTreat) },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const jewelweedFn = (state) => {
  const { animalToTreat, hands, usedPlants, selectedPlant } = state;
  const poison = { damageAmount: 0, roundsNumber: 0 };
  if (hands.user.includes(animalToTreat) && animalToTreat.poisoned.rounds > 0) {
    return {
      ...state,
      hands: {
        ...hands,
        user: setPoisonedInAHand(hands.user, poison, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const coffeeFn = (state) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  if (hands.user.includes(animalToTreat) && animalToTreat.paralyzed > 0) {
    return {
      ...state,
      hands: {
        ...hands,
        user: setParalyzedInAHand(hands.user, 0, animalToTreat),
      },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const withaniaFn = (state) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  if (hands.user.includes(animalToTreat)) {
    return {
      ...state,
      hands: { ...hands, user: setAttackInAHand(hands.user, 1, animalToTreat) },
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
