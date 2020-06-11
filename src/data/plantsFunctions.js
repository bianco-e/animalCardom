const ricinumFn = (state) => {
  const { animalToTreat, hands, usedPlants, selectedPlant } = state;
  const handWithPoisonedCard = (arr) => {
    return arr.map((card) => {
      if (card === animalToTreat) {
        return {
          ...card,
          poisoned: {
            damage: 1,
            rounds: 3,
          },
        };
      } else return card;
    });
  };
  if (hands.pc.includes(animalToTreat)) {
    return {
      ...state,
      hands: { ...hands, pc: handWithPoisonedCard(hands.pc) },
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
    const userHandWithHealthedCard = hands.user.map((card) => {
      if (card === animalToTreat) {
        return {
          ...card,
          life: {
            ...card.life,
            current:
              card.life.current + 2 > card.life.initial
                ? card.life.initial
                : card.life.current + 2,
          },
        };
      } else return card;
    });
    return {
      ...state,
      hands: { ...hands, user: userHandWithHealthedCard },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const peyoteFn = (state) => {
  const { animalToTreat, selectedPlant } = state;
  return { ...state, animalToTreat: undefined, selectedPlant: undefined };
};

const jewelweedFn = (state) => {
  const { animalToTreat, selectedPlant } = state;
  return { ...state, animalToTreat: undefined, selectedPlant: undefined };
};

const plantsFunctions = {
  ricinum: ricinumFn,
  aloe: aloeFn,
  peyote: peyoteFn,
  jewelweed: jewelweedFn,
};

export default plantsFunctions;
