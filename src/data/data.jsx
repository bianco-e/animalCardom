import plantsFunctions from "./plantsFunctions";
import skillsFunctions from "./skillsFunctions";

export const utilitiesIcons = {
  attack: "/images/icons/attack-icon.png",
  fury: "/images/icons/fury-icon.png",
  blood: "/images/icons/blood-icon.png",
};

export const terrains = [
  { type: "Sea", color: "#87CEEB", familyToBuff: "🦈" },
  { type: "Swamp", color: "#228B22", familyToBuff: "🐸" },
  { type: "Jungle", color: "#006400", familyToBuff: "🐺" },
  { type: "Dessert", color: "#DEB887", familyToBuff: "🦂" },
  { type: "Mountain", color: "#C0C0C0", familyToBuff: "🦅" },
  { type: "Forest", color: "#2E8B57", familyToBuff: "🦎" },
];

class Plant {
  constructor(name, description, image, toDo) {
    this.name = name;
    this.description = description;
    this.image = image;
    this.toDo = toDo;
  }
}

const plants = [
  new Plant(
    "Ricinum",
    "Highly poisonous seeds: can poison any enemy making 1 damage per round, for 3 rounds",
    "https://1.bp.blogspot.com/-zSHJ8wTmG14/WEMxdEhIDGI/AAAAAAAAQbU/EzJQttXOuU4_iyLzzel2fK-XiURsoJcVgCLcB/s1600/ricinus-minor.jpg",
    plantsFunctions.ricinumFn
  ),
  new Plant(
    "Aloe",
    "Very effective in treating wounds: can heal any ally restoring 2 life points",
    "https://www.calloways.com/wp-content/uploads/G151-03.jpg",
    plantsFunctions.aloeFn
  ),
  new Plant(
    "Peyote",
    "Its hallucinogen mescaline makes any enemy unable to use its skill for the next round",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Peyote_Cactus.jpg/800px-Peyote_Cactus.jpg",
    plantsFunctions.peyoteFn
  ),
  new Plant(
    "Jewelweed",
    "Its antidote properties can eliminate any poison effect in an ally",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Potapsco_fg13.jpg/800px-Potapsco_fg13.jpg",
    plantsFunctions.jewelweedFn
  ),
  new Plant(
    "Coffee",
    "Coffe bean given to an animal can immediately wake all its senses, making it free from any paralyzing effect",
    "https://wikifaunia.com/wp-content/uploads/2015/08/cafe-300x225.jpg",
    plantsFunctions.coffeeFn
  ),
  new Plant(
    "Withania",
    "Its fruit has been always used as a natural energizer which makes animals as strong as rock increasing its attack by 1",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/WithaniaFruit.jpg/220px-WithaniaFruit.jpg",
    plantsFunctions.withaniaFn
  ),
];

class Animal {
  constructor(
    family,
    species,
    image,
    skill,
    attack,
    life,
    poisoned,
    paralyzed,
    targeteable = true,
    bleeding = false
  ) {
    this.family = family;
    this.species = species;
    this.image = image;
    this.skill = skill;
    this.attack = attack;
    this.life = life;
    this.poisoned = poisoned;
    this.paralyzed = paralyzed;
    this.targeteable = targeteable;
    this.bleeding = bleeding;
  }
}

const animals = [
  new Animal(
    "🦎",
    "Crocodile",
    "/images/animals/adult-crocodile.webp",
    {
      name: "Nibble",
      description:
        "Crocodile bites its enemy using its strong jaws which inflicts 2 extra damage.",
      toDo: skillsFunctions.crocodileFn,
    },
    { initial: 10, current: 10 },
    { initial: 10, current: 10 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦎",
    "Tortoise",
    "/images/animals/adult-tortoise.webp",
    {
      name: "Hibernate",
      description:
        "After Tortoise attacks, it can get inside its shell increasing its total life by 2.",
      toDo: skillsFunctions.tortoiseFn,
    },
    { initial: 2, current: 2 },
    { initial: 9, current: 9 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦎",
    "Snake",
    "/images/animals/adult-snake.webp",
    {
      name: "Venom",
      description:
        "Snake can poison its enemy for the next 3 rounds, inflicting 1 damage per round.",
      toDo: skillsFunctions.snakeFn,
    },
    { initial: 8, current: 8 },
    { initial: 7, current: 7 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦎",
    "Komodo Dragon",
    "/images/animals/adult-komodo-dragon.webp",
    {
      name: "Poisonous saliva",
      description:
        "Komodo Dragon can bite inflicting 1 extra damage and poisoning its enemy for 1 round.",
      toDo: skillsFunctions.komododragonFn,
    },
    { initial: 10, current: 10 },
    { initial: 10, current: 10 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦎",
    "Chameleon",
    "/images/animals/adult-chameleon.webp",
    {
      name: "Mimicry",
      description:
        "Chameleon is untargeteable. Can't be seen until it attacks.",
      toDo: skillsFunctions.chameleonFn,
    },
    { initial: 3, current: 3 },
    { initial: 4, current: 4 },
    { damage: 0, rounds: 0 },
    0,
    false
  ),
  new Animal(
    "🐸",
    "Toad",
    "/images/animals/adult-toad.webp",
    {
      name: "Sticky tongue",
      description:
        "Toad can use its large tongue to devorate any insect immediatly.",
      toDo: skillsFunctions.toadFn,
    },
    { initial: 3, current: 3 },
    { initial: 3, current: 3 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐸",
    "Salamander",
    "/images/animals/adult-salamander.webp",
    {
      name: "Tissue regeneration",
      description:
        "Salamander can regenerate its own body after attacking, healing 1 life point if damaged.",
      toDo: skillsFunctions.salamanderFn,
    },
    { initial: 2, current: 2 },
    { initial: 4, current: 4 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Shark",
    "/images/animals/adult-shark.webp",
    {
      name: "Bloodseeker",
      description:
        "If there's any animal bleeding, Shark's attack will increase by 2 after attacking.",
      toDo: skillsFunctions.sharkFn,
    },
    { initial: 9, current: 9 },
    { initial: 11, current: 11 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Stingray",
    "/images/animals/adult-stingray.webp",
    {
      name: "Barbed sting",
      description:
        "Stingray's venom glands poison enemy, inflicting 1 damage on next round'.",
      toDo: skillsFunctions.stingrayFn,
    },
    { initial: 8, current: 8 },
    { initial: 6, current: 6 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Orc",
    "/images/animals/adult-orc.webp",
    {
      name: "Waterjet",
      description:
        "Orc's waterjet makes enemy unable to see paralyzing it for one round",
      toDo: skillsFunctions.orcFn,
    },
    { initial: 7, current: 7 },
    { initial: 13, current: 13 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Blowfish",
    "/images/animals/adult-blowfish.webp",
    {
      name: "Puff up",
      description:
        "Blowfish can puff up, increasing its attack by 2 after attacking.",
      toDo: skillsFunctions.blowfishFn,
    },
    { initial: 2, current: 2 },
    { initial: 5, current: 5 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Electric Eel",
    "/images/animals/adult-electric-eel.webp",
    {
      name: "Electric shock",
      description:
        "Electric Eel can shock an enemy paralyzing it for 2 rounds.",
      toDo: skillsFunctions.electriceelFn,
    },
    { initial: 3, current: 3 },
    { initial: 5, current: 5 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦅",
    "Eagle",
    "/images/animals/adult-eagle.webp",
    {
      name: "Free fall",
      description:
        "Eagle falls from the sky and pecks its enemy making 2 damage, or killing it if it's an insect.",
      toDo: skillsFunctions.eagleFn,
    },
    { initial: 6, current: 6 },
    { initial: 7, current: 7 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦅",
    "Vulture",
    "/images/animals/adult-vulture.webp",
    {
      name: "Carrion",
      description:
        "Vulture's attack will be increased by 4 if there's any dead animal.",
      toDo: skillsFunctions.vultureFn,
    },
    { initial: 3, current: 3 },
    { initial: 6, current: 6 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦅",
    "Cassowary",
    "/images/animals/adult-cassowary.webp",
    {
      name: "Assault",
      description:
        "Cassowary uses its casque and claws to knock enemy paralyzing it for 1 round.",
      toDo: skillsFunctions.cassowaryFn,
    },
    { initial: 7, current: 7 },
    { initial: 7, current: 7 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦅",
    "Parrot",
    "/images/animals/adult-parrot.webp",
    {
      name: "Echo",
      description:
        "When Parrot kills its first enemy automatically copies its skill.",
      toDo: skillsFunctions.parrotFn,
    },
    { initial: 3, current: 3 },
    { initial: 4, current: 4 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦂",
    "Mosquito",
    "/images/animals/adult-mosquito.webp",
    {
      name: "Life drain",
      description:
        "When attacking, Mosquito drains enemy's life points adding it to its life.",
      toDo: skillsFunctions.mosquitoFn,
    },
    { initial: 2, current: 2 },
    { initial: 1, current: 1 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦂",
    "Scorpion",
    "/images/animals/adult-scorpion.webp",
    {
      name: "Revenge",
      description:
        "Before dying, Scorpion stings its enemy inflicting 1 damage per round for 3 rounds.",
      toDo: skillsFunctions.scorpionFn,
    },
    { initial: 9, current: 9 },
    { initial: 5, current: 5 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦂",
    "Bee",
    "/images/animals/adult-bee.webp",
    {
      name: "Life or Death",
      description:
        "Bee can sting its enemy making 3 extra damage, but will die after doing it.",
      toDo: skillsFunctions.beeFn,
    },
    { initial: 4, current: 4 },
    { initial: 3, current: 3 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦂",
    "Spider",
    "/images/animals/adult-spider.webp",
    {
      name: "Sticky wrapping",
      description:
        "Spider can wrap its enemy paralyzing it, so it can't use its ability for 2 rounds.",
      toDo: skillsFunctions.spiderFn,
    },
    { initial: 6, current: 6 },
    { initial: 4, current: 4 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Bear",
    "/images/animals/adult-bear.webp",
    {
      name: "Sharp claws",
      description:
        "Bear nails its claws making enemy bleed, inflicting 1 damage per round until it dies.",
      toDo: skillsFunctions.bearFn,
    },
    { initial: 8, current: 8 },
    { initial: 11, current: 11 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Lion",
    "/images/animals/adult-lion.webp",
    {
      name: "Roar",
      description:
        "Lion roars and scares enemy so it can't attack for 3 rounds.",
      toDo: skillsFunctions.lionFn,
    },
    { initial: 11, current: 11 },
    { initial: 10, current: 10 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Gorilla",
    "/images/animals/adult-gorilla.webp",
    {
      name: "Chest beating",
      description:
        "Gorilla beats its chest getting motivation from nowhere, increasing its attack by 1.",
      toDo: skillsFunctions.gorillaFn,
    },
    { initial: 8, current: 8 },
    { initial: 11, current: 11 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Cheetah",
    "/images/animals/adult-cheetah.webp",
    {
      name: "Ambush",
      description:
        "Cheetah is hidden behind bush. Can't be targeted until it attacks first.",
      toDo: skillsFunctions.cheetahFn,
    },
    { initial: 7, current: 7 },
    { initial: 7, current: 7 },
    { damage: 0, rounds: 0 },
    0,
    false
  ),
  new Animal(
    "🐺",
    "Hyena",
    "/images/animals/adult-hyena.webp",
    {
      name: "Bite the wound",
      description: "Hyena can bite an injuried enemy, making 2 extra damage.",
      toDo: skillsFunctions.hyenaFn,
    },
    { initial: 7, current: 7 },
    { initial: 8, current: 8 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Elephant",
    "/images/animals/adult-elephant.webp",
    {
      name: "Stomp",
      description:
        "Elephant can hardly stomp making all enemies' attack decrease by 1. Enemies' attack can't be lower than 1.",
      toDo: skillsFunctions.elephantFn,
    },
    { initial: 6, current: 6 },
    { initial: 12, current: 12 },
    { damage: 0, rounds: 0 },
    0
  ),
];

const shuffleArr = (array) => {
  var j, x, i;
  for (i = array.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = array[i];
    array[i] = array[j];
    array[j] = x;
  }
  return array;
};

export const getCards = () => {
  var tenCards = shuffleArr(animals).slice(0, 10);
  return {
    pc: tenCards.slice(0, 5),
    user: tenCards.slice(5, 10),
  };
};

export const getPlants = () => {
  var fourCards = shuffleArr(plants);
  return {
    pc: fourCards.slice(0, 3),
    user: fourCards.slice(3, 6),
  };
};

export const getAnimalsInfo = () => {
  const getfamilyLength = (emoji) => {
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
