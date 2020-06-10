import attIcon from "../images/attackIcon.png";
import furyIcon from "../images/furyIcon.png";
import lifeIcon from "../images/lifeIcon.png";
import plantsFunctions from "./plantsFunctions";

const utilitiesIcons = {
  attack: attIcon,
  life: lifeIcon,
  fury: furyIcon,
};

// Add plants to each hand like: antidote, healing plant, poisonous mushroom
// Add option to set terrains that can benefit animals families: sea, forest, sand, etc...

const terrains = [
  { terrain: "sea", color: "#87CEEB", familyToBuff: "🦈" },
  { terrain: "swamp", color: "#228B22", familyToBuff: "🐸" },
  { terrain: "jungle", color: "#006400", familyToBuff: "🐺" },
  { terrain: "dessert", color: "#DEB887", familyToBuff: "🦂" },
  { terrain: "mountain", color: "#C0C0C0", familyToBuff: "🦅" },
  { terrain: "forest", color: "#2E8B57", familyToBuff: "🦎" },
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
    plantsFunctions.ricinum
  ),
  new Plant(
    "Aloe",
    "Very effective in treating wounds: can heal any ally restoring 2 life points",
    "https://www.calloways.com/wp-content/uploads/G151-03.jpg",
    plantsFunctions.aloe
  ),
  new Plant(
    "Peyote",
    "Its hallucinogen mescaline makes any enemy unable to use its skill for the next round",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Peyote_Cactus.jpg/800px-Peyote_Cactus.jpg",
    plantsFunctions.peyote
  ),
  new Plant(
    "Jewelweed",
    "Its antidote properties can eliminate any poison effect in an ally",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Potapsco_fg13.jpg/800px-Potapsco_fg13.jpg",
    plantsFunctions.jewelweed
  ),
];

class Animal {
  constructor(family, species, image, skill, attack, life) {
    this.family = family;
    this.species = species;
    this.image = image;
    this.skill = skill;
    this.attack = attack;
    this.life = life;
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
    },
    { initial: 10, current: 10 },
    { initial: 10, current: 10 }
  ),
  new Animal(
    "🦎",
    "Tortoise",
    "https://img.culturacolectiva.com/cdn-cgi/image/f=auto,w=1600,q=80,fit=contain/content_image/2020/5/22/1590170907479-reaparece-tortuga-gigante-fernandina-en-peligro-de-extincion.001.jpeg",
    {
      name: "Hibernate",
      description:
        "After its first attack, Tortoise can get inside its shell increasing its life by 5.",
    },
    { initial: 2, current: 2 },
    { initial: 10, current: 10 }
  ),
  new Animal(
    "🦎",
    "Snake",
    "https://www.oronoticias.com.mx/wp-content/uploads/2019/07/serpiente.jpg",
    {
      name: "Venom",
      description:
        "Snake can poison and paralyze its enemy for the next 3 rounds, inflicting 1 damage per round.",
    },
    { initial: 10, current: 10 },
    { initial: 7, current: 7 }
  ),
  new Animal(
    "🦎",
    "Komodo Dragon",
    "https://t1.ev.ltmcdn.com/es/posts/1/3/6/por_que_el_dragon_de_komodo_esta_en_peligro_de_extincion_1631_600.jpg",
    {
      name: "Poisonous saliva",
      description:
        "Komodo Dragon can bite inflicting 2 extra damage and 1 extra damage on next round.",
    },
    { initial: 10, current: 10 },
    { initial: 10, current: 10 }
  ),
  new Animal(
    "🦎",
    "Chameleon",
    "https://cumbrepuebloscop20.org/wp-content/uploads/2018/09/CAMALE%C3%93N-sus-colores-var%C3%ADan-de-acuerdo-a-su-condici%C3%B3n-de-vida-1.jpg",
    {
      name: "Mimicry",
      description:
        "Chameleon is untargeteable. Enemy can't see it until it attacks.",
    },
    { initial: 3, current: 3 },
    { initial: 4, current: 4 }
  ),
  new Animal(
    "🐸",
    "Toad",
    "https://cdn.colombia.com/sdi/2020/01/20/significado-sonar-con-sapos-803289.jpg",
    {
      name: "Sticky tongue",
      description:
        "Toad can devorate any insect immediatly. This skill can be used just once.",
    },
    { initial: 3, current: 3 },
    { initial: 3, current: 3 }
  ),
  new Animal(
    "🐸",
    "Salamander",
    "https://dr282zn36sxxg.cloudfront.net/datastreams/f-d%3A557c2460eab996bf3a2f50da686efbccaa2fd2cff611a768b337e5ab%2BIMAGE_TINY%2BIMAGE_TINY.1",
    {
      name: "Tissue regeneration",
      description:
        "Salamander can regenerate any part of its body, healing 1 point per round if damaged.",
    },
    { initial: 2, current: 2 },
    { initial: 4, current: 4 }
  ),
  new Animal(
    "🦈",
    "Shark",
    "https://www.ngenespanol.com/wp-content/uploads/2018/08/%C2%BFPor-qu%C3%A9-disminuy%C3%B3-el-riesgo-de-ataques-de-tibur%C3%B3n.jpg",
    {
      name: "Bloodseeker",
      description:
        "Shark can devorate any damaged enemy under 7 life in one bite.",
    },
    { initial: 13, current: 13 },
    { initial: 12, current: 12 }
  ),
  new Animal(
    "🦈",
    "Stingray",
    "https://e00-marca.uecdn.es/blogs/bajo-el-mar/imagenes_posts/2016/10/07/174515_570x347.jpg",
    {
      name: "Camouflage",
      description:
        "Stingray can hide from all enemies and can't be attacked till it atacks.",
    },
    { initial: 10, current: 10 },
    { initial: 6, current: 6 }
  ),
  new Animal(
    "🦈",
    "Orc",
    "https://assets.cdnelnuevodiario.com/cache/78/69/7869617d2d0031d4db5566c49229dbbc.jpg",
    {
      name: "Waterjet",
      description:
        "Orc ejects a waterjet from its back making the enemy unable to see and attack on next round",
    },
    { initial: 7, current: 7 },
    { initial: 14, current: 14 }
  ),
  new Animal(
    "🦈",
    "Blowfish",
    "https://www.aquariumcostadealmeria.com/wp-content/uploads/2019/02/shutterstock_127967549.gif",
    {
      name: "Self-defence",
      description:
        "Blowfish reflects 3 damage to any enemy that dares to atack it.",
    },
    { initial: 3, current: 3 },
    { initial: 5, current: 5 }
  ),
  new Animal(
    "🦈",
    "Electric Eel",
    "https://animalesexotico.org/wp-content/uploads/2019/11/Webp.net-resizeimage-2019-11-16T080704.632.jpg",
    {
      name: "Electric shock",
      description:
        "Electric Eel can shock an enemy paralyzing it for 2 rounds.",
    },
    { initial: 3, current: 3 },
    { initial: 5, current: 5 }
  ),
  new Animal(
    "🦅",
    "Eagle",
    "https://laopinion.com/wp-content/uploads/sites/3/2019/06/andy_morffew_-_bald_eagle_32252960978.jpg?quality=80&strip=all&w=940",
    {
      name: "Free fall",
      description:
        "Eagle falls from the sky and pecks its enemy making 2 damage, or killing it if it's an insect.",
    },
    { initial: 8, current: 8 },
    { initial: 7, current: 7 }
  ),
  new Animal(
    "🦅",
    "Vulture",
    "https://static.malaga.es/malaga/subidas/imagenes/1/1/arc_260811_g.jpg",
    {
      name: "Carrion",
      description:
        "Vulture's attack will be increased by 5 if there's any dead animal.",
    },
    { initial: 3, current: 3 },
    { initial: 7, current: 7 }
  ),
  new Animal(
    "🦅",
    "Cassowary",
    "https://www.junglepark.es/wp-content/uploads/2017/05/casuarioblog2-1024x978.jpg",
    {
      name: "Assault",
      description:
        "Cassowary uses its casque and claws to knock enemy down and making it lose 1 round.",
    },
    { initial: 9, current: 9 },
    { initial: 8, current: 8 }
  ),
  new Animal(
    "🦅",
    "Parrot",
    "https://avesexoticas.org/wp-content/uploads/2017/06/Chestnut-fronted_Macaw_Ara_severa_-Free_Flight_Aviary_-San_Diego-3000x1997.jpg",
    {
      name: "Echo",
      description:
        "When Parrot kills an enemy will automatically copy its skill.",
    },
    { initial: 3, current: 3 },
    { initial: 4, current: 4 }
  ),
  new Animal(
    "🦂",
    "Mosquito",
    "https://imagenes.20minutos.es/files/image_990_v1/uploads/imagenes/2019/07/05/986865.jpg",
    {
      name: "Life drain",
      description:
        "After its first attack Mosquito will start to drain enemy's life, 2 points per round.",
    },
    { initial: 2, current: 2 },
    { initial: 1, current: 1 }
  ),
  new Animal(
    "🦂",
    "Scorpion",
    "https://www.caracteristicas.co/wp-content/uploads/2018/12/escorpion-2-e1584472396622.jpg",
    {
      name: "Revenge",
      description:
        "Before dying, Scorpion stings its enemy inflicting 1 damage per round for 5 rounds.",
    },
    { initial: 9, current: 9 },
    { initial: 5, current: 5 }
  ),
  new Animal(
    "🦂",
    "Bee",
    "https://www.rankeamos.com/uploads/2019/4/abejaafricana_1554405087.jpg",
    {
      name: "Life or Death",
      description:
        "Bee can sting its enemy making 2 extra damage, but will die after doing it.",
    },
    { initial: 6, current: 6 },
    { initial: 3, current: 3 }
  ),
  new Animal(
    "🦂",
    "Spider",
    "https://cdnmundo1.img.sputniknews.com/img/109135/72/1091357298_0:290:1920:1328_1000x541_80_0_0_5b55f584c4a63ff0ffeff88b86420468.jpg",
    {
      name: "Sticky wrapping",
      description:
        "Spider can wrap its enemy paralyzing it, so it can't use its ability for 3 rounds.",
    },
    { initial: 7, current: 7 },
    { initial: 4, current: 4 }
  ),
  new Animal(
    "🐺",
    "Bear",
    "https://www.vistazo.com/sites/default/files/styles/threshold-768/public/field/image/2020/05/22/oso-ataca-humano-rusia-vistazo.jpg?itok=__ohpoFM",
    {
      name: "Sharp claws",
      description:
        "Bear nails its claws making enemy bleed, inflicting 1 damage per round for 2 rounds.",
    },
    { initial: 9, current: 9 },
    { initial: 12, current: 12 }
  ),
  new Animal(
    "🐺",
    "Lion",
    "https://www.euroresidentes.com/suenos/img_suenos/leon-suenos-euroresidentes.jpg",
    {
      name: "Roar",
      description:
        "Lion roars and scares enemy so it can't attack for 3 rounds.",
    },
    { initial: 12, current: 12 },
    { initial: 12, current: 12 }
  ),
  new Animal(
    "🐺",
    "Gorilla",
    "https://img.vixdata.io/pd/jpg-large/es/sites/default/files/btg/gorila_cuerpo_entero.jpg",
    {
      name: "Chest beating",
      description:
        "Gorilla beats its chest scaring the enemy so it can't attack for the next round.",
    },
    { initial: 9, current: 9 },
    { initial: 12, current: 12 }
  ),
  new Animal(
    "🐺",
    "Cheetah",
    "https://www.nationalgeographic.com.es/medio/2018/02/27/guepardo__1280x720.jpg",
    {
      name: "Ambush",
      description:
        "Cheetah appears from nowhere when some ally is attacked inflicting 2 damage to the enemy.",
    },
    { initial: 9, current: 9 },
    { initial: 9, current: 9 }
  ),
  new Animal(
    "🐺",
    "Hyena",
    "https://i.pinimg.com/originals/31/da/8f/31da8f9afc9d01f748fb5d417b3710d9.jpg",
    {
      name: "Bite the wound",
      description: "Hyena can bite an injuried enemy, making 2 extra damage.",
    },
    { initial: 7, current: 7 },
    { initial: 8, current: 8 }
  ),
  new Animal(
    "🐺",
    "Elephant",
    "https://static.nationalgeographic.es/files/styles/image_3200/public/2928.600x450.jpg?w=1900&h=1425",
    {
      name: "Stomp",
      description:
        "Elephant can hardly stomp making all enemies' attack decrease by 1.",
    },
    { initial: 6, current: 6 },
    { initial: 12, current: 12 }
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
    pc: fourCards.slice(0, 2),
    user: fourCards.slice(2, 4),
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
