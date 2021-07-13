import { IHandsState } from "../context/HandsContext";
import { HandKey, IAnimal, Poisoned } from "../interfaces";

const poisonEnemy = (arr: IAnimal[], defender: IAnimal, poisoned: Poisoned) => {
  return arr.map((card) => {
    if (card.name === defender.name && card.life.current !== "DEAD") {
      return {
        ...card,
        poisoned,
      };
    } else return card;
  });
};

const makeEnemyBleed = (arr: IAnimal[], defender: IAnimal) => {
  return arr.map((card) => {
    if (card.name === defender.name && card.life.current !== "DEAD") {
      return {
        ...card,
        bleeding: true,
      };
    } else return card;
  });
};

const makeExtraDamage = (arr: IAnimal[], defender: IAnimal, damage: number) => {
  return arr.map((card) => {
    if (card.name === defender.name && typeof card.life.current === "number") {
      return {
        ...card,
        life: {
          ...card.life,
          current:
            card.life.current - damage < 1
              ? "DEAD"
              : card.life.current - damage,
        },
      };
    } else return card;
  });
};

const paralyzeEnemy = (
  arr: IAnimal[],
  defender: IAnimal,
  roundsNumber: number
) => {
  return arr.map((card) => {
    if (card.name === defender.name && card.life.current !== "DEAD") {
      return {
        ...card,
        paralyzed: roundsNumber,
      };
    } else return card;
  });
};

const healItself = (
  arr: IAnimal[],
  attacker: IAnimal,
  healthAmount: number
) => {
  return arr.map((card) => {
    if (card.name === attacker.name && typeof card.life.current === "number") {
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

const killInstantly = (arr: IAnimal[], animal: IAnimal) => {
  return arr.map((card) => {
    if (card.name === animal.name) {
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

const modifyAnimalAttack = (
  arr: IAnimal[],
  animal: IAnimal,
  attackAmount: number,
  operator: "+" | "-"
) => {
  return arr.map((card) => {
    if (card.name === animal.name) {
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

const increaseAlliesAttack = (arr: IAnimal[], attackAmount: number) => {
  return arr.map((card) => {
    if (card.life.current !== "DEAD") {
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

const decreaseEnemiesAttack = (arr: IAnimal[], attackAmount: number) => {
  return arr.map((card) => {
    if (card.life.current !== "DEAD" && card.attack.current > 1) {
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

const copyDefenderSkill = (
  arr: IAnimal[],
  defender: IAnimal,
  attacker: IAnimal
) => {
  return arr.map((card) => {
    if (card.name === attacker.name) {
      return {
        ...card,
        skill: defender.skill,
      };
    } else return card;
  });
};

const setTargeteableAsTrue = (arr: IAnimal[], animal: IAnimal) => {
  return arr.map((card) => {
    if (card.name === animal.name) {
      return {
        ...card,
        targeteable: true,
      };
    } else return card;
  });
};

const setHandInState = (
  state: IHandsState,
  hand: HandKey,
  newHand: IAnimal[]
) => {
  return {
    ...state,
    hands: {
      ...state.hands,
      [hand]: newHand,
    },
  };
};

const alligatorFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const damage = 1;
  const newHand = makeExtraDamage(hands[hand], defender!, damage);
  return setHandInState(state, hand, newHand);
};

const batFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newOwnHand = healItself(hands[otherHand], attacker!, 1);
  const newEnemyHand = makeEnemyBleed(hands[hand], defender!);
  return {
    ...state,
    hands: {
      [hand]: newEnemyHand,
      [otherHand]: newOwnHand,
    },
  };
};

const bearFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const newHand = makeEnemyBleed(hands[hand], defender!);
  return setHandInState(state, hand, newHand);
};

const beeFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender, attacker } = state;
  const damage = 3;
  const otherHand = hand === "pc" ? "user" : "pc";
  return {
    ...state,
    hands: {
      [otherHand]: killInstantly(hands[otherHand], attacker!),
      [hand]: makeExtraDamage(hands[hand], defender!, damage),
    },
  };
};

const blowfishFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const attackAmount = 2;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = modifyAnimalAttack(
    hands[otherHand],
    attacker!,
    attackAmount,
    "+"
  );
  return setHandInState(state, otherHand, newHand);
};

const cassowaryFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 1;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const chameleonFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = setTargeteableAsTrue(hands[otherHand], attacker!);
  return setHandInState(state, otherHand, newHand);
};

const cheetahFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = setTargeteableAsTrue(hands[otherHand], attacker!);
  return setHandInState(state, otherHand, newHand);
};

const crocodileFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const damage = 2;
  const newHand = makeExtraDamage(hands[hand], defender!, damage);
  return setHandInState(state, hand, newHand);
};

const eagleFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender, attacker } = state;
  const damage = 2;
  if (attacker!.species !== "🦂") {
    const newHand = makeExtraDamage(hands[hand], defender!, damage);
    return setHandInState(state, hand, newHand);
  } else {
    const newHand = killInstantly(hands[hand], defender!);
    return setHandInState(state, hand, newHand);
  }
};

const electriceelFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 2;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const elephantFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands } = state;
  const attackAmount = 1;
  const newHand = decreaseEnemiesAttack(hands[hand], attackAmount);
  return setHandInState(state, hand, newHand);
};

const gorillaFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const attackAmount = 1;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = modifyAnimalAttack(
    hands[otherHand],
    attacker!,
    attackAmount,
    "+"
  );
  return setHandInState(state, otherHand, newHand);
};

const hornedLizardFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 3;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const hyenaFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const damage = 2;
  if (defender!.life.current < defender!.life.initial) {
    const newHand = makeExtraDamage(hands[hand], defender!, damage);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const komododragonFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const poison = { damage: 1, rounds: 1 };
  const damage = 1;
  const poisonedHand = poisonEnemy(hands[hand], defender!, poison);
  const newHand = makeExtraDamage(poisonedHand, defender!, damage);
  return setHandInState(state, hand, newHand);
};

const leechFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker, defender } = state;
  if (defender!.bleeding) {
    const otherHand = hand === "pc" ? "user" : "pc";
    const newHand = healItself(hands[otherHand], attacker!, 2);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const lionFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 3;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const littleLionFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 3;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const mosquitoFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = healItself(
    hands[otherHand],
    attacker!,
    attacker!.attack.current
  );
  return setHandInState(state, otherHand, newHand);
};

const octopusFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 1;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const orcFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 1;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const parrotFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender, attacker } = state;
  const otherHand = hand === "pc" ? "user" : "pc";
  const updatedDefender = hands[hand].find(
    (card) => card.name === defender!.name
  );
  if (
    updatedDefender &&
    updatedDefender.life.current === "DEAD" &&
    !updatedDefender.skill.types.includes("none")
  ) {
    const newHand = copyDefenderSkill(hands[otherHand], defender!, attacker!);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const pelicanFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  if (defender!.species === "🦈") {
    const damage = 2;
    const newHand = makeExtraDamage(hands[hand], defender!, damage);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const salamanderFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const healthAmount = 1;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (attacker!.life.current < attacker!.life.initial) {
    const newHand = healItself(hands[otherHand], attacker!, healthAmount);
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const scorpionFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const poison = { damage: 1, rounds: 3 };
  const newHand = poisonEnemy(hands[hand], defender!, poison);
  return setHandInState(state, hand, newHand);
};

const sharkFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const attackAmount = 2;
  const otherHand = hand === "pc" ? "user" : "pc";
  if (hands[hand].concat(hands[otherHand]).some((card) => card.bleeding)) {
    const newHand = modifyAnimalAttack(
      hands[otherHand],
      attacker!,
      attackAmount,
      "+"
    );
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const snakeFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const poison = { damage: 1, rounds: 3 };
  const newHand = poisonEnemy(hands[hand], defender!, poison);
  return setHandInState(state, hand, newHand);
};

const spiderFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const roundsNumber = 2;
  const newHand = paralyzeEnemy(hands[hand], defender!, roundsNumber);
  return setHandInState(state, hand, newHand);
};

const stingrayFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const poison = { damage: 1, rounds: 1 };
  const newHand = poisonEnemy(hands[hand], defender!, poison);
  return setHandInState(state, hand, newHand);
};

const swordfishFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  const newHand = makeEnemyBleed(hands[hand], defender!);
  return setHandInState(state, hand, newHand);
};

const toadAndFrogFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, defender } = state;
  if (defender!.species === "🦂") {
    const newHand = killInstantly(hands[hand], defender!);
    return setHandInState(state, hand, newHand);
  } else return state;
};

const tortoiseFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands, attacker } = state;
  const healthAmount = 2;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = healItself(hands[otherHand], attacker!, healthAmount);
  return setHandInState(state, otherHand, newHand);
};

const vultureFn = (state: IHandsState, hand: HandKey): IHandsState => {
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
      attacker!,
      attackAmount,
      "+"
    );
    return setHandInState(state, otherHand, newHand);
  } else return state;
};

const wolfFn = (state: IHandsState, hand: HandKey): IHandsState => {
  const { hands } = state;
  const attackAmount = 1;
  const otherHand = hand === "pc" ? "user" : "pc";
  const newHand = increaseAlliesAttack(hands[otherHand], attackAmount);
  return setHandInState(state, otherHand, newHand);
};

export const getExtraDamageIfApplies = (
  attacker: IAnimal,
  defender: IAnimal
): number => {
  const isNotParalyzed = attacker.paralyzed === 0;
  switch (attacker.name) {
    case "Alligator":
      return isNotParalyzed ? 1 : 0;
    case "Crocodile":
      return isNotParalyzed ? 2 : 0;
    case "Komodo Dragon":
      return isNotParalyzed ? 1 : 0;
    case "Eagle":
      return isNotParalyzed && defender.species !== "🦂" ? 2 : 0;
    case "Hyena":
      return isNotParalyzed && defender.life.current < defender.life.initial
        ? 2
        : 0;
    case "Pelican":
      return isNotParalyzed && defender.species === "🦈" ? 2 : 0;
    case "Bee":
      return isNotParalyzed ? 3 : 0;
    default:
      return 0;
  }
};

export default function getSkillFn(name: string) {
  switch (name) {
    case "Alligator":
      return alligatorFn;
    case "Crocodile":
      return crocodileFn;
    case "Tortoise":
      return tortoiseFn;
    case "Snake":
      return snakeFn;
    case "Komodo Dragon":
      return komododragonFn;
    case "Chameleon":
      return chameleonFn;
    case "Horned Lizard":
      return hornedLizardFn;
    case "Frog":
      return toadAndFrogFn;
    case "Toad":
      return toadAndFrogFn;
    case "Salamander":
      return salamanderFn;
    case "Shark":
      return sharkFn;
    case "Stingray":
      return stingrayFn;
    case "Swordfish":
      return swordfishFn;
    case "Octopus":
      return octopusFn;
    case "Orc":
      return orcFn;
    case "Blowfish":
      return blowfishFn;
    case "Electric Eel":
      return electriceelFn;
    case "Eagle":
      return eagleFn;
    case "Vulture":
      return vultureFn;
    case "Cassowary":
      return cassowaryFn;
    case "Parrot":
      return parrotFn;
    case "Pelican":
      return pelicanFn;
    case "Mosquito":
      return mosquitoFn;
    case "Scorpion":
      return scorpionFn;
    case "Bee":
      return beeFn;
    case "Spider":
      return spiderFn;
    case "Leech":
      return leechFn;
    case "Bat":
      return batFn;
    case "Bear":
      return bearFn;
    case "Lion":
      return lionFn;
    case "Little Lion":
      return littleLionFn;
    case "Gorilla":
      return gorillaFn;
    case "Cheetah":
      return cheetahFn;
    case "Hyena":
      return hyenaFn;
    case "Elephant":
      return elephantFn;
    case "Wolf":
      return wolfFn;
    default:
      return (state: IHandsState) => state;
  }
}
