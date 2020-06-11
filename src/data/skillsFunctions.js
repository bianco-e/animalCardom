const poisonEnemy = (arr, defender, { damageAmount, roundsNumber }) => {
  return arr.map((card) => {
    if (card === defender) {
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

const snakeFn = (state) => {
  const { hands, defender } = state;
  const poison = { damageAmount: 1, roundsNumber: 3 };
  return {
    ...state,
    hands: { ...hands, pc: poisonEnemy(hands.pc, defender, poison) },
  };
};

const doNothing = (state) => {
  return state;
};

const skillsFunctions = {
  crocodile: doNothing,
  tortoise: doNothing,
  snake: snakeFn,
  komododragon: doNothing,
  chameleon: doNothing,
  toad: doNothing,
  salamander: doNothing,
  shark: doNothing,
  stingray: doNothing,
  orc: doNothing,
  blowfish: doNothing,
  electriceel: doNothing,
  eagle: doNothing,
  vulture: doNothing,
  cassowary: doNothing,
  parrot: doNothing,
  mosquito: doNothing,
  scorpion: doNothing,
  bee: doNothing,
  spider: doNothing,
  bear: doNothing,
  lion: doNothing,
  gorilla: doNothing,
  cheetah: doNothing,
  hyena: doNothing,
  elephant: doNothing,
};

export default skillsFunctions;
