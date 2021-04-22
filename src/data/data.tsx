import plantsFunctions from "./plantsFunctions";
import skillsFunctions from "./skillsFunctions";
import { IAnimal, IHands, IPlant, IPlants, ITerrain } from "../interfaces";

export const utilitiesIcons = {
  attack: "/images/icons/attack-icon.png",
  fury: "/images/icons/fury-icon.png",
  blood: "/images/icons/blood-icon.png",
};

export const terrains: ITerrain[] = [
  {
    type: "Sea",
    color: "#87CEEB",
    familyToBuff: "🦈",
    image: "/images/terrains/sea.webp",
  },
  {
    type: "Swamp",
    color: "#228B22",
    familyToBuff: "🐸",
    image: "/images/terrains/swamp.jpeg",
  },
  {
    type: "Jungle",
    color: "#006400",
    familyToBuff: "🐺",
    image: "/images/terrains/jungle.jpeg",
  },
  {
    type: "Desert",
    color: "#DEB887",
    familyToBuff: "🦂",
    image: "/images/terrains/desert.jpeg",
  },
  {
    type: "Mountain",
    color: "#C0C0C0",
    familyToBuff: "🦅",
    image: "/images/terrains/mountain.webp",
  },
  {
    type: "Forest",
    color: "#2E8B57",
    familyToBuff: "🦎",
    image: "/images/terrains/forest.jpeg",
  },
];

const plants: IPlant[] = [
  {
    name: "Ricinum",
    description:
      "Highly poisonous seeds: can poison any enemy making 1 damage per round, for 3 rounds",
    image: "/images/plants/ricinum.webp",
    toDo: plantsFunctions.ricinumFn,
  },
  {
    name: "Aloe",
    description:
      "Very effective in treating wounds: can heal any ally restoring 2 life points",
    image: "/images/plants/aloe.webp",
    toDo: plantsFunctions.aloeFn,
  },
  {
    name: "Peyote",
    description:
      "Its hallucinogen mescaline makes any enemy unable to use its skill for the next round",
    image: "/images/plants/peyote.webp",
    toDo: plantsFunctions.peyoteFn,
  },
  {
    name: "Jewelweed",
    description:
      "Its antidote properties can eliminate any poison effect in an ally",
    image: "/images/plants/jewelweed.webp",
    toDo: plantsFunctions.jewelweedFn,
  },
  {
    name: "Coffee",
    description:
      "Coffe bean given to an animal can immediately wake all its senses, making it free from any paralyzing effect",
    image: "/images/plants/coffee.webp",
    toDo: plantsFunctions.coffeeFn,
  },
  {
    name: "Withania",
    description:
      "Its fruit has been always used as a natural energizer which makes animals as strong as rock increasing its attack by 1",
    image: "/images/plants/withania.webp",
    toDo: plantsFunctions.withaniaFn,
  },
];

const animals: IAnimal[] = [
  {
    family: "🦎",
    species: "Crocodile",
    image: "/images/animals/adult-crocodile.webp",
    skill: {
      name: "Nibble",
      description:
        "Crocodile bites its enemy using its strong jaws which inflicts 2 extra damage.",
      toDo: skillsFunctions.crocodileFn,
    },
    attack: { initial: 10, current: 10 },
    life: { initial: 10, current: 10 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦎",
    species: "Tortoise",
    image: "/images/animals/adult-tortoise.webp",
    skill: {
      name: "Hibernate",
      description:
        "After Tortoise attacks, it can get inside its shell increasing its total life by 2.",
      toDo: skillsFunctions.tortoiseFn,
    },
    attack: { initial: 2, current: 2 },
    life: { initial: 9, current: 9 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦎",
    species: "Snake",
    image: "/images/animals/adult-snake.webp",
    skill: {
      name: "Venom",
      description:
        "Snake can poison its enemy for the next 3 rounds, inflicting 1 damage per round.",
      toDo: skillsFunctions.snakeFn,
    },
    attack: { initial: 8, current: 8 },
    life: { initial: 7, current: 7 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦎",
    species: "Komodo Dragon",
    image: "/images/animals/adult-komodo-dragon.webp",
    skill: {
      name: "Poisonous saliva",
      description:
        "Komodo Dragon can bite inflicting 1 extra damage and poisoning its enemy for 1 round.",
      toDo: skillsFunctions.komododragonFn,
    },
    attack: { initial: 10, current: 10 },
    life: { initial: 10, current: 10 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦎",
    species: "Chameleon",
    image: "/images/animals/adult-chameleon.webp",
    skill: {
      name: "Mimicry",
      description:
        "Chameleon is untargeteable. Can't be seen until it attacks.",
      toDo: skillsFunctions.chameleonFn,
    },
    attack: { initial: 3, current: 3 },
    life: { initial: 4, current: 4 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: false,
    bleeding: false,
  },
  {
    family: "🐸",
    species: "Toad",
    image: "/images/animals/adult-toad.webp",
    skill: {
      name: "Sticky tongue",
      description:
        "Toad can use its large tongue to devorate any insect immediatly.",
      toDo: skillsFunctions.toadFn,
    },
    attack: { initial: 3, current: 3 },
    life: { initial: 3, current: 3 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🐸",
    species: "Salamander",
    image: "/images/animals/adult-salamander.webp",
    skill: {
      name: "Tissue regeneration",
      description:
        "Salamander can regenerate its own body after attacking, healing 1 life point if damaged.",
      toDo: skillsFunctions.salamanderFn,
    },
    attack: { initial: 2, current: 2 },
    life: { initial: 4, current: 4 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦈",
    species: "Shark",
    image: "/images/animals/adult-shark.webp",
    skill: {
      name: "Bloodseeker",
      description:
        "If there's any animal bleeding, Shark's attack will increase by 2 after attacking.",
      toDo: skillsFunctions.sharkFn,
    },
    attack: { initial: 9, current: 9 },
    life: { initial: 11, current: 11 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦈",
    species: "Stingray",
    image: "/images/animals/adult-stingray.webp",
    skill: {
      name: "Barbed sting",
      description:
        "Stingray's venom glands poison enemy, inflicting 1 damage on next round'.",
      toDo: skillsFunctions.stingrayFn,
    },
    attack: { initial: 8, current: 8 },
    life: { initial: 6, current: 6 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦈",
    species: "Orc",
    image: "/images/animals/adult-orc.webp",
    skill: {
      name: "Waterjet",
      description:
        "Orc's waterjet makes enemy unable to see paralyzing it for one round",
      toDo: skillsFunctions.orcFn,
    },
    attack: { initial: 7, current: 7 },
    life: { initial: 13, current: 13 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦈",
    species: "Blowfish",
    image: "/images/animals/adult-blowfish.webp",
    skill: {
      name: "Puff up",
      description:
        "Blowfish can puff up, increasing its attack by 2 after attacking.",
      toDo: skillsFunctions.blowfishFn,
    },
    attack: { initial: 2, current: 2 },
    life: { initial: 5, current: 5 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦈",
    species: "Electric Eel",
    image: "/images/animals/adult-electric-eel.webp",
    skill: {
      name: "Electric shock",
      description:
        "Electric Eel can shock an enemy paralyzing it for 2 rounds.",
      toDo: skillsFunctions.electriceelFn,
    },
    attack: { initial: 3, current: 3 },
    life: { initial: 5, current: 5 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦅",
    species: "Eagle",
    image: "/images/animals/adult-eagle.webp",
    skill: {
      name: "Free fall",
      description:
        "Eagle falls from the sky and pecks its enemy making 2 damage, or killing it if it's an insect.",
      toDo: skillsFunctions.eagleFn,
    },
    attack: { initial: 6, current: 6 },
    life: { initial: 7, current: 7 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦅",
    species: "Vulture",
    image: "/images/animals/adult-vulture.webp",
    skill: {
      name: "Carrion",
      description:
        "After attacking Vulture's attack will be increased by 4 if there's any dead animal.",
      toDo: skillsFunctions.vultureFn,
    },
    attack: { initial: 3, current: 3 },
    life: { initial: 6, current: 6 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦅",
    species: "Cassowary",
    image: "/images/animals/adult-cassowary.webp",
    skill: {
      name: "Assault",
      description:
        "Cassowary uses its casque and claws to knock enemy paralyzing it for 1 round.",
      toDo: skillsFunctions.cassowaryFn,
    },
    attack: { initial: 7, current: 7 },
    life: { initial: 7, current: 7 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦅",
    species: "Parrot",
    image: "/images/animals/adult-parrot.webp",
    skill: {
      name: "Echo",
      description:
        "When Parrot kills its first enemy automatically copies its skill.",
      toDo: skillsFunctions.parrotFn,
    },
    attack: { initial: 3, current: 3 },
    life: { initial: 4, current: 4 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦂",
    species: "Mosquito",
    image: "/images/animals/adult-mosquito.webp",
    skill: {
      name: "Life drain",
      description:
        "When attacking, Mosquito drains enemy's life points adding it to its life.",
      toDo: skillsFunctions.mosquitoFn,
    },
    attack: { initial: 2, current: 2 },
    life: { initial: 1, current: 1 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦂",
    species: "Scorpion",
    image: "/images/animals/adult-scorpion.webp",
    skill: {
      name: "Revenge",
      description:
        "Before dying, Scorpion stings its enemy inflicting 1 damage per round for 3 rounds.",
      toDo: skillsFunctions.scorpionFn,
    },
    attack: { initial: 9, current: 9 },
    life: { initial: 5, current: 5 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦂",
    species: "Bee",
    image: "/images/animals/adult-bee.webp",
    skill: {
      name: "Life or Death",
      description:
        "Bee can sting its enemy making 3 extra damage, but will die after doing it.",
      toDo: skillsFunctions.beeFn,
    },
    attack: { initial: 4, current: 4 },
    life: { initial: 3, current: 3 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🦂",
    species: "Spider",
    image: "/images/animals/adult-spider.webp",
    skill: {
      name: "Sticky wrapping",
      description:
        "Spider can wrap its enemy paralyzing it, so it can't use its ability for 2 rounds.",
      toDo: skillsFunctions.spiderFn,
    },
    attack: { initial: 6, current: 6 },
    life: { initial: 4, current: 4 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🐺",
    species: "Bear",
    image: "/images/animals/adult-bear.webp",
    skill: {
      name: "Sharp claws",
      description:
        "Bear nails its claws making enemy bleed, inflicting 1 damage per round until it dies.",
      toDo: skillsFunctions.bearFn,
    },
    attack: { initial: 8, current: 8 },
    life: { initial: 11, current: 11 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🐺",
    species: "Lion",
    image: "/images/animals/adult-lion.webp",
    skill: {
      name: "Roar",
      description:
        "Lion roars and scares enemy so it can't attack for 3 rounds.",
      toDo: skillsFunctions.lionFn,
    },
    attack: { initial: 11, current: 11 },
    life: { initial: 12, current: 12 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🐺",
    species: "Gorilla",
    image: "/images/animals/adult-gorilla.webp",
    skill: {
      name: "Chest beating",
      description:
        "Gorilla beats its chest getting motivation from nowhere, increasing its attack by 1.",
      toDo: skillsFunctions.gorillaFn,
    },
    attack: { initial: 8, current: 8 },
    life: { initial: 11, current: 11 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🐺",
    species: "Cheetah",
    image: "/images/animals/adult-cheetah.webp",
    skill: {
      name: "Ambush",
      description:
        "Cheetah is hidden behind bush. Can't be targeted until it attacks first.",
      toDo: skillsFunctions.cheetahFn,
    },
    attack: { initial: 7, current: 7 },
    life: { initial: 7, current: 7 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: false,
    bleeding: false,
  },
  {
    family: "🐺",
    species: "Hyena",
    image: "/images/animals/adult-hyena.webp",
    skill: {
      name: "Bite the wound",
      description: "Hyena can bite an injuried enemy, making 2 extra damage.",
      toDo: skillsFunctions.hyenaFn,
    },
    attack: { initial: 7, current: 7 },
    life: { initial: 8, current: 8 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
  {
    family: "🐺",
    species: "Elephant",
    image: "/images/animals/adult-elephant.webp",
    skill: {
      name: "Stomp",
      description:
        "Elephant stomps decreasing all enemies' attack by 1. Enemies' attack can't be less than 1.",
      toDo: skillsFunctions.elephantFn,
    },
    attack: { initial: 6, current: 6 },
    life: { initial: 12, current: 12 },
    poisoned: { damage: 0, rounds: 0 },
    paralyzed: 0,
    targeteable: true,
    bleeding: false,
  },
];

const shuffleArr = (array: any[]) => {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

export const getCards = (): IHands => {
  var tenCards = shuffleArr(animals).slice(0, 10);
  return {
    pc: tenCards.slice(0, 5),
    user: tenCards.slice(5, 10),
  };
};

export const getPlants = (): IPlants => {
  var fourCards = shuffleArr(plants);
  return {
    pc: fourCards.slice(0, 3),
    user: fourCards.slice(3, 6),
  };
};

export const getAnimalsInfo = () => {
  const getfamilyLength = (emoji: string) => {
    return animals.filter((animal) => animal.family === emoji).length;
  };
  console.log(
    animals.length + " cards,",
    getfamilyLength("🦎") + " reptiles,",
    getfamilyLength("🐸") + " amphibians,",
    getfamilyLength("🦈") + " fishes,",
    getfamilyLength("🦅") + " birds,",
    getfamilyLength("🦂") + " insects,",
    getfamilyLength("🐺") + " mammals"
  );
};
