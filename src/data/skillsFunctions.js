const poisonEnemy = (arr, defender, { damageAmount, roundsNumber }) => {
  return arr.map((card) => {
    if (card.species === defender.species) {
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

const makeExtraDamage = (arr, defender, damage) => {
  return arr.map((card) => {
    if (card.species === defender.species) {
      return {
        ...card,
        life: {
          ...card.life,
          current:
            card.life.current - damage < 1 || card.life.current === "DEAD"
              ? "DEAD"
              : card.life.current - damage,
        },
      };
    } else return card;
  });
};

const paralyzeEnemy = (arr, defender, roundsNumber) => {
  return arr.map((card) => {
    if (card.species === defender.species) {
      return {
        ...card,
        paralyzed: roundsNumber,
      };
    } else return card;
  });
};

const bearFn = (state) => {
  return state;
};

const beeFn = (state) => {
  return state;
};

const blowfishFn = (state) => {
  return state;
};

const cassowaryFn = (state) => {
  return state;
};

const chameleonFn = (state) => {
  return state;
};

const cheetahFn = (state) => {
  return state;
};

const crocodileFn = (state, hand) => {
  const { hands, defender } = state;
  const damage = 2;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: makeExtraDamage(hands[hand], defender, damage),
    },
  };
};

const eagleFn = (state) => {
  return state;
};

const electriceelFn = (state) => {
  return state;
};

const elephantFn = (state) => {
  return state;
};

const gorillaFn = (state) => {
  return state;
};

const hyenaFn = (state) => {
  return state;
};

const komododragonFn = (state) => {
  return state;
};

const lionFn = (state) => {
  return state;
};

const mosquitoFn = (state) => {
  return state;
};

const orcFn = (state) => {
  return state;
};

const parrotFn = (state) => {
  return state;
};

const salamanderFn = (state) => {
  return state;
};

const scorpionFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: poisonEnemy(hands[hand], defender, poison),
    },
  };
};

const sharkFn = (state) => {
  return state;
};

const snakeFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: poisonEnemy(hands[hand], defender, poison),
    },
  };
};

const spiderFn = (state) => {
  return state;
};

const stingrayFn = (state) => {
  return state;
};

const toadFn = (state) => {
  return state;
};

const tortoiseFn = (state) => {
  return state;
};

const vultureFn = (state) => {
  return state;
};

const skillsFunctions = {
  crocodileFn,
  tortoiseFn,
  snakeFn,
  komododragonFn,
  chameleonFn,
  toadFn,
  salamanderFn,
  sharkFn,
  stingrayFn,
  orcFn,
  blowfishFn,
  electriceelFn,
  eagleFn,
  vultureFn,
  cassowaryFn,
  parrotFn,
  mosquitoFn,
  scorpionFn,
  beeFn,
  spiderFn,
  bearFn,
  lionFn,
  gorillaFn,
  cheetahFn,
  hyenaFn,
  elephantFn,
};

export default skillsFunctions;
