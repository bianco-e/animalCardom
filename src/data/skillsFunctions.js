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

// skills TO DO: cheetah, bear

const bearFn = (state, hand) => {
  return state;
};

const beeFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  const damage = 3;
  const newHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      [newHand]: killInstantly(hands[newHand], attacker),
      [hand]: makeExtraDamage(hands[hand], defender, damage),
    },
  };
};

const blowfishFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 2;
  const newHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      ...hands,
      [newHand]: modifyAnimalAttack(
        hands[newHand],
        attacker,
        attackAmount,
        "+"
      ),
    },
  };
};

const cassowaryFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 1;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: paralyzeEnemy(hands[hand], defender, roundsNumber),
    },
  };
};

const chameleonFn = (state, hand) => {
  const { hands, attacker } = state;
  const newHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      ...hands,
      [newHand]: setTargeteableAsTrue(hands[newHand], attacker),
    },
  };
};

const cheetahFn = (state, hand) => {
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

const eagleFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  const damage = 2;
  if (attacker.family !== "🦂") {
    return {
      ...state,
      hands: {
        ...hands,
        [hand]: makeExtraDamage(hands[hand], defender, damage),
      },
    };
  } else
    return {
      ...state,
      hands: {
        ...hands,
        [hand]: killInstantly(hands[hand], defender),
      },
    };
};

const electriceelFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 2;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: paralyzeEnemy(hands[hand], defender, roundsNumber),
    },
  };
};

const elephantFn = (state, hand) => {
  const { hands } = state;
  const attackAmount = 1;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: decreaseEnemiesAttack(hands[hand], attackAmount),
    },
  };
};

const gorillaFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 1;
  const newHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      ...hands,
      [newHand]: modifyAnimalAttack(
        hands[newHand],
        attacker,
        attackAmount,
        "+"
      ),
    },
  };
};

const hyenaFn = (state, hand) => {
  const { hands, defender } = state;
  const damage = 2;
  if (defender.life.current < defender.life.initial) {
    return {
      ...state,
      hands: {
        ...hands,
        [hand]: makeExtraDamage(hands[hand], defender, damage),
      },
    };
  } else return state;
};

const komododragonFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 1 };
  const damage = 1;
  const poisonedHand = poisonEnemy(hands[hand], defender, poison);
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: makeExtraDamage(poisonedHand, defender, damage),
    },
  };
};

const lionFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 3;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: paralyzeEnemy(hands[hand], defender, roundsNumber),
    },
  };
};

const mosquitoFn = (state, hand) => {
  const { hands, attacker } = state;
  const newHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      ...hands,
      [newHand]: healItself(hands[newHand], attacker, attacker.attack.current),
    },
  };
};

const orcFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 1;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: paralyzeEnemy(hands[hand], defender, roundsNumber),
    },
  };
};

const parrotFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  const newHand = hand === "pc" ? "user" : "pc";
  const refreshedDefender = hands[hand].find(
    (card) => card.species === defender.species
  );
  if (refreshedDefender.life.current === "DEAD") {
    return {
      ...state,
      hands: {
        ...hands,
        [newHand]: copyDefenderSkill(hands[newHand], defender, attacker),
      },
    };
  } else return state;
};

const salamanderFn = (state, hand) => {
  const { hands, attacker } = state;
  const healthAmount = 1;
  const newHand = hand === "pc" ? "user" : "pc";
  if (attacker.life.current < attacker.life.initial) {
    return {
      ...state,
      hands: {
        ...hands,
        [newHand]: healItself(hands[newHand], attacker, healthAmount),
      },
    };
  } else return state;
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

const sharkFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 4;
  const newHand = hand === "pc" ? "user" : "pc";
  if (
    hands[hand].some(
      (card) => card.life.current < 3 && card.life.current !== card.life.initial
    )
  ) {
    return {
      ...state,
      hands: {
        ...hands,
        [newHand]: modifyAnimalAttack(
          hands[newHand],
          attacker,
          attackAmount,
          "+"
        ),
      },
    };
  } else return state;
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

const spiderFn = (state, hand) => {
  const { hands, defender } = state;
  const roundsNumber = 2;
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: paralyzeEnemy(hands[hand], defender, roundsNumber),
    },
  };
};

const stingrayFn = (state, hand) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 1 };
  return {
    ...state,
    hands: {
      ...hands,
      [hand]: poisonEnemy(hands[hand], defender, poison),
    },
  };
};

const toadFn = (state, hand) => {
  const { hands, defender, attacker } = state;
  if (attacker.family !== "🦂") {
    return {
      ...state,
      hands: {
        ...hands,
        [hand]: killInstantly(hands[hand], defender),
      },
    };
  }
};

const tortoiseFn = (state, hand) => {
  const { hands, attacker } = state;
  const healthAmount = 2;
  const newHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      ...hands,
      [newHand]: healItself(hands[newHand], attacker, healthAmount),
    },
  };
};

const vultureFn = (state, hand) => {
  const { hands, attacker } = state;
  const attackAmount = 4;
  const newHand = hand === "pc" ? "user" : "pc";
  if (
    hands[hand]
      .concat(hands[newHand])
      .some((card) => card.life.current === "DEAD")
  ) {
    return {
      ...state,
      hands: {
        ...hands,
        [newHand]: modifyAnimalAttack(
          hands[newHand],
          attacker,
          attackAmount,
          "+"
        ),
      },
    };
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
