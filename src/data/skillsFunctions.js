const poisonEnemy = (arr, defender, { damageAmount, roundsNumber }) => {
  return arr.map((card) => {
    if (card.species === defender.species && card.life.current !== "DEAD") {
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

const makeEnemyBleed = (arr, defender) => {
  return arr.map((card) => {
    if (card.species === defender.species && card.life.current !== "DEAD") {
      return {
        ...card,
        bleeding: true,
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
    if (card.species === defender.species && card.life.current !== "DEAD") {
      return {
        ...card,
        paralyzed: roundsNumber,
      };
    } else return card;
  });
};

const healItself = (arr, attacker, healthAmount) => {
  return arr.map((card) => {
    if (card.species === attacker.species) {
      return {
        ...card,
        life: {
          ...card.life,
          current: card.life.current + healthAmount,
        },
      };
    } else return card;
  });
};

const killInstantly = (arr, animal) => {
  return arr.map((card) => {
    if (card.species === animal.species) {
      return {
        ...card,
        life: {
          ...card.life,
          current: "DEAD",
        },
      };
    } else return card;
  });
};

const modifyAnimalAttack = (arr, animal, attackAmount, operator) => {
  return arr.map((card) => {
    if (card.species === animal.species) {
      return {
        ...card,
        attack: {
          ...card.attack,
          current:
            operator === "+"
              ? card.attack.current + attackAmount
              : card.attack.current - attackAmount,
        },
      };
    } else return card;
  });
};

const decreaseEnemiesAttack = (arr, attackAmount) => {
  return arr.map((card) => {
    if (card.life.current !== "DEAD") {
      return {
        ...card,
        attack: {
          ...card.attack,
          current: card.attack.current - attackAmount,
        },
      };
    } else return card;
  });
};

const copyDefenderSkill = (arr, defender, attacker) => {
  return arr.map((card) => {
    if (card.species === attacker.species) {
      return {
        ...card,
        skill: defender.skill,
      };
    } else return card;
  });
};

const setTargeteableAsTrue = (arr, animal) => {
  return arr.map((card) => {
    if (card.species === animal.species) {
      return {
        ...card,
        targeteable: true,
      };
    } else return card;
  });
};

const setHandInState = (state, hand, newHand) => {
  return {
    ...state,
    hands: {
      ...state.hands,
      [hand]: newHand,
    },
  };
};

const bearFn = (state, hand) => {
  const { hands, defender } = state;
  const newHand = makeEnemyBleed(hands[hand], defender);
  return setHandInState(state, hand, newHand);
};

const beeFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  const damage = 3;
  const otherHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      [otherHand]: killInstantly(hands[otherHand], attacker),
      [hand]: makeExtraDamage(hands[hand], defender, damage),
    },
  };
};

const blowfishFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 2;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = modifyAnimalAttack(
    hands[otherHand],
    attacker,
    attackAmount,
    "+"
  );
  return setHandInState(state, otherHand, newHand);
};

const cassowaryFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 1;
  const newHand = paralyzeEnemy(hands[hand], defender, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const chameleonFn = (state, hand) => {
  const { hands, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = setTargeteableAsTrue(hands[otherHand], attacker);
  return setHandInState(state, otherHand, newHand);
};

const cheetahFn = (state, hand) => {
  const { hands, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = setTargeteableAsTrue(hands[otherHand], attacker);
  return setHandInState(state, otherHand, newHand);
};

const crocodileFn = (state, hand) => {
  const { hands, defender } = state;
  const damage = 2;
  const newHand = makeExtraDamage(hands[hand], defender, damage);
  return setHandInState(state, hand, newHand);
};

const eagleFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  const damage = 2;
  if (attacker.family !== "🦂") {
    var newHand = makeExtraDamage(hands[hand], defender, damage);
    return setHandInState(state, hand, newHand);
  } else {
    var newHand = killInstantly(hands[hand], defender);
    return setHandInState(state, hand, newHand);
  }
};

const electriceelFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 2;
  const newHand = paralyzeEnemy(hands[hand], defender, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const elephantFn = (state, hand) => {
  const { hands } = state;
  const attackAmount = 1;
  const newHand = decreaseEnemiesAttack(hands[hand], attackAmount);
  return setHandInState(state, hand, newHand);
};

const gorillaFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 1;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = modifyAnimalAttack(
    hands[otherHand],
    attacker,
    attackAmount,
    "+"
  );
  return setHandInState(state, otherHand, newHand);
};

const hyenaFn = (state, hand) => {
  const { hands, defender } = state;
  const damage = 2;
  if (defender.life.current < defender.life.initial) {
    const newHand = makeExtraDamage(hands[hand], defender, damage);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const komododragonFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 1 };
  const damage = 1;
  const poisonedHand = poisonEnemy(hands[hand], defender, poison);
  const newHand = makeExtraDamage(poisonedHand, defender, damage);
  return setHandInState(state, hand, newHand);
};

const lionFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 3;
  const newHand = paralyzeEnemy(hands[hand], defender, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const mosquitoFn = (state, hand) => {
  const { hands, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = healItself(
    hands[otherHand],
    attacker,
    attacker.attack.current
  );
  return setHandInState(state, otherHand, newHand);
};

const orcFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 1;
  const newHand = paralyzeEnemy(hands[hand], defender, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const parrotFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const updatedDefender = hands[hand].find(
    (card) => card.species === defender.species
  );
  if (updatedDefender.life.current === "DEAD") {
    const newHand = copyDefenderSkill(hands[otherHand], defender, attacker);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const salamanderFn = (state, hand) => {
  const { hands, attacker } = state;
  const healthAmount = 1;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (attacker.life.current < attacker.life.initial) {
    const newHand = healItself(hands[otherHand], attacker, healthAmount);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const scorpionFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  const newHand = poisonEnemy(hands[hand], defender, poison);
  return setHandInState(state, hand, newHand);
};

const sharkFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 2;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[hand].concat(hands[otherHand]).some((card) => card.bleeding)) {
    const newHand = modifyAnimalAttack(
      hands[otherHand],
      attacker,
      attackAmount,
      "+"
    );
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const snakeFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  const newHand = poisonEnemy(hands[hand], defender, poison);
  return setHandInState(state, hand, newHand);
};

const spiderFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 2;
  const newHand = paralyzeEnemy(hands[hand], defender, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const stingrayFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 1 };
  const newHand = poisonEnemy(hands[hand], defender, poison);
  return setHandInState(state, hand, newHand);
};

const toadFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  if (attacker.family === "🦂") {
    const newHand = killInstantly(hands[hand], defender);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const tortoiseFn = (state, hand) => {
  const { hands, attacker } = state;
  const healthAmount = 2;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = healItself(hands[otherHand], attacker, healthAmount);
  return setHandInState(state, otherHand, newHand);
};

const vultureFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 4;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (
    hands[hand]
      .concat(hands[otherHand])
      .some((card) => card.life.current === "DEAD")
  ) {
    const newHand = modifyAnimalAttack(
      hands[otherHand],
      attacker,
      attackAmount,
      "+"
    );
    return setHandInState(state, otherHand, newHand);
  } else return state;
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
