import attIcon from "../images/attackIcon.png";
import furyIcon from "../images/furyIcon.png";
import plantsFunctions from "./plantsFunctions";
import skillsFunctions from "./skillsFunctions";

const utilitiesIcons = {
  attack: attIcon,
  fury: furyIcon,
};

const terrains = [
  { terrain: "Sea", color: "#87CEEB", familyToBuff: "🦈" },
  { terrain: "Swamp", color: "#228B22", familyToBuff: "🐸" },
  { terrain: "Jungle", color: "#006400", familyToBuff: "🐺" },
  { terrain: "Dessert", color: "#DEB887", familyToBuff: "🦂" },
  { terrain: "Mountain", color: "#C0C0C0", familyToBuff: "🦅" },
  { terrain: "Forest", color: "#2E8B57", familyToBuff: "🦎" },
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
    paralyzed
  ) {
    this.family = family;
    this.species = species;
    this.image = image;
    this.skill = skill;
    this.attack = attack;
    this.life = life;
    this.poisoned = poisoned;
    this.paralyzed = paralyzed;
  }
}

const animals = [
  new Animal(
    "🦎",
    "Crocodile",
    "https://cdn.cienradios.com/wp-content/uploads/sites/3/2020/03/cocodrilo-1.jpg",
    {
      name: "Nibble",
      description:
        "Crocodile bites its enemy with its strong jaws, inflicting 2 extra damage.",
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
    "https://img.culturacolectiva.com/cdn-cgi/image/f=auto,w=1600,q=80,fit=contain/content_image/2020/5/22/1590170907479-reaparece-tortuga-gigante-fernandina-en-peligro-de-extincion.001.jpeg",
    {
      name: "Hibernate",
      description:
        "After Tortoise attacks, it can get inside its shell increasing its life by 2.",
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
    "https://www.oronoticias.com.mx/wp-content/uploads/2019/07/serpiente.jpg",
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
    "https://t1.ev.ltmcdn.com/es/posts/1/3/6/por_que_el_dragon_de_komodo_esta_en_peligro_de_extincion_1631_600.jpg",
    {
      name: "Poisonous saliva",
      description:
        "Komodo Dragon can bite inflicting 1 extra damage and poisoning it for 1 round.",
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
    "https://cumbrepuebloscop20.org/wp-content/uploads/2018/09/CAMALE%C3%93N-sus-colores-var%C3%ADan-de-acuerdo-a-su-condici%C3%B3n-de-vida-1.jpg",
    {
      name: "Mimicry",
      description:
        "Chameleon is untargeteable. Can't be seen until it attacks.",
      toDo: skillsFunctions.chameleonFn,
    },
    { initial: 3, current: 3 },
    { initial: 4, current: 4 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐸",
    "Toad",
    "https://cdn.colombia.com/sdi/2020/01/20/significado-sonar-con-sapos-803289.jpg",
    {
      name: "Sticky tongue",
      description:
        "Toad can devorate any insect immediatly. This skill can be used just once.",
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
    "https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3A557c2460eab996bf3a2f50da686efbccaa2fd2cff611a768b337e5ab%2BIMAGE_TINY%2BIMAGE_TINY.1",
    {
      name: "Tissue regeneration",
      description:
        "Salamander can regenerate any part of its body after attacking, healing 1 life point if damaged.",
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
    "https://www.ngenespanol.com/wp-content/uploads/2018/08/%C2%BFPor-qu%C3%A9-disminuy%C3%B3-el-riesgo-de-ataques-de-tibur%C3%B3n.jpg",
    {
      name: "Bloodseeker",
      description:
        "If there's any damaged enemy under 3 life, Shark's attack will increase by 3 after attacking.",
      toDo: skillsFunctions.sharkFn,
    },
    { initial: 10, current: 10 },
    { initial: 11, current: 11 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Stingray",
    "https://e00-marca.uecdn.es/blogs/bajo-el-mar/imagenes_posts/2016/10/07/174515_570x347.jpg",
    {
      name: "Camouflage",
      description:
        "Stingray can hide from all enemies and can't be attacked till it atacks.",
      toDo: skillsFunctions.stingrayFn,
    },
    { initial: 9, current: 9 },
    { initial: 6, current: 6 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Orc",
    "https://assets.cdnelnuevodiario.com/cache/78/69/7869617d2d0031d4db5566c49229dbbc.jpg",
    {
      name: "Waterjet",
      description:
        "Orc ejects a waterjet from its back making the enemy unable to see paralyzing it for one round",
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
    "https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/02/shutterstock_127967549.gif",
    {
      name: "Self-defence",
      description:
        "Blowfish reflects 3 damage to any enemy that dares to atack it.",
      toDo: skillsFunctions.blowfishFn,
    },
    { initial: 3, current: 3 },
    { initial: 5, current: 5 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦈",
    "Electric Eel",
    "https://animalesexotico.org/wp-content/uploads/2019/11/Webp.net-resizeimage-2019-11-16T080704.632.jpg",
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
    "https://laopinion.com/wp-content/uploads/sites/3/2019/06/andy_morffew_-_bald_eagle_32252960978.jpg?quality=80&strip=all&w=940",
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
    "https://static.malaga.es/malaga/subidas/imagenes/1/1/arc_260811_g.jpg",
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
    "https://www.junglepark.es/wp-content/uploads/2017/05/casuarioblog2-1024x978.jpg",
    {
      name: "Assault",
      description:
        "Cassowary uses its casque and claws to knock enemy and paralyze it for 1 round.",
      toDo: skillsFunctions.cassowaryFn,
    },
    { initial: 8, current: 8 },
    { initial: 7, current: 7 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🦅",
    "Parrot",
    "https://avesexoticas.org/wp-content/uploads/2017/06/Chestnut-fronted_Macaw_Ara_severa_-Free_Flight_Aviary_-San_Diego-3000x1997.jpg",
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
    "https://imagenes.20minutos.es/files/image_990_v1/uploads/imagenes/2019/07/05/986865.jpg",
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
    "https://www.caracteristicas.co/wp-content/uploads/2018/12/escorpion-2-e1584472396622.jpg",
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
    "https://www.rankeamos.com/uploads/2019/4/abejaafricana_1554405087.jpg",
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
    "https://cdnmundo1.img.sputniknews.com/img/109135/72/1091357298_0:290:1920:1328_1000x541_80_0_0_5b55f584c4a63ff0ffeff88b86420468.jpg",
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
    "https://www.vistazo.com/sites/default/files/styles/threshold-768/public/field/image/2020/05/22/oso-ataca-humano-rusia-vistazo.jpg?itok=__ohpoFM",
    {
      name: "Sharp claws",
      description:
        "Bear nails its claws making enemy bleed, inflicting 1 damage per round for 2 rounds.",
      toDo: skillsFunctions.bearFn,
    },
    { initial: 9, current: 9 },
    { initial: 11, current: 11 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Lion",
    "https://www.euroresidentes.com/suenos/img_suenos/leon-suenos-euroresidentes.jpg",
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
    "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/btg/gorila_cuerpo_entero.jpg",
    {
      name: "Chest beating",
      description:
        "Gorilla beats its chest scaring the enemy so it can't attack for the next round.",
      toDo: skillsFunctions.gorillaFn,
    },
    { initial: 9, current: 9 },
    { initial: 11, current: 11 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Cheetah",
    "https://www.nationalgeographic.com.es/medio/2018/02/27/guepardo__1280x720.jpg",
    {
      name: "Ambush",
      description:
        "Cheetah appears from nowhere when some ally is attacked inflicting 2 damage to the enemy.",
      toDo: skillsFunctions.cheetahFn,
    },
    { initial: 8, current: 8 },
    { initial: 8, current: 8 },
    { damage: 0, rounds: 0 },
    0
  ),
  new Animal(
    "🐺",
    "Hyena",
    "https://i.pinimg.com/originals/31/da/8f/31da8f9afc9d01f748fb5d417b3710d9.jpg",
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
    "https://static.nationalgeographic.es/files/styles/image_3200/public/2928.600x450.jpg?w=1900&h=1425",
    {
      name: "Stomp",
      description:
        "Elephant can hardly stomp making all enemies' attack decrease by 1.",
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

const getCards = () => {
  var tenCards = shuffleArr(animals).slice(0, 10);
  return {
    pc: tenCards.slice(0, 5),
    user: tenCards.slice(5, 10),
  };
};

const getPlants = () => {
  var fourCards = shuffleArr(plants);
  return {
    pc: fourCards.slice(0, 3),
    user: fourCards.slice(3, 6),
  };
};

const getAnimalsInfo = () => {
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

export { terrains, getPlants, utilitiesIcons, getCards, getAnimalsInfo };
