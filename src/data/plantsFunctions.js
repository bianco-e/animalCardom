const ricinumFn = (state) => {
  const { animalToTreat, hands, usedPlants, selectedPlant } = state;
  if (hands.pc.includes(animalToTreat)) {
    const pcHandWithPoisonedCard = hands.pc.map((card) => {
      if (card === animalToTreat) {
        return {
          ...card,
          life: {
            ...card.life,
            current: card.life.current - 1 < 1 ? "DEAD" : card.life.current - 1,
          },
        };
      } else return card;
    });
    return {
      ...state,
      hands: { ...hands, pc: pcHandWithPoisonedCard },
      animalToTreat: undefined,
      selectedPlant: undefined,
      usedPlants: [...usedPlants, selectedPlant],
    };
  } else return state;
};

const aloeFn = (state) => {
  const { animalToTreat, hands, selectedPlant, usedPlants } = state;
  if (hands.user.includes(animalToTreat)) {
    const userHandWithHealthedCard = hands.user.map((card) => {
      if (
        card === animalToTreat &&
        card.life.current < card.life.initial &&
        card.life.current !== "DEAD"
      ) {
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
