import attIcon from "../images/attackIcon.png";
import furyIcon from "../images/furyIcon.png";
import lifeIcon from "../images/lifeIcon.png";

const utilitiesIcons = {
  attack: attIcon,
  life: lifeIcon,
  fury: furyIcon,
};

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
        "Crocodile bites its enemy with its strong jaws, weakening the enemy and inflicts 2 extra damage.",
    },
    11,
    10
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
    2,
    10
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
    10,
    7
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
    10,
    10
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
    3,
    4
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
    3,
    3
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
    2,
    4
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
    13,
    12
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
    10,
    6
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
    7,
    14
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
    3,
    5
  ),
  new Animal(
    "🦅",
    "Eagle",
    "https://laopinion.com/wp-content/uploads/sites/3/2019/06/andy_morffew_-_bald_eagle_32252960978.jpg?quality=80&strip=all&w=940",
    {
      name: "Free fall",
      description:
        "Eagle falls from the sky and hardly pecks its enemy making 2 extra damage, or killing it if it's an insect.",
    },
    8,
    7
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
    3,
    7
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
    9,
    8
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
    3,
    4
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
    2,
    1
  ),
  new Animal(
    "🦂",
    "Scorpion",
    "https://www.caracteristicas.co/wp-content/uploads/2018/12/escorpion-2-e1584472396622.jpg",
    {
      name: "Revenge",
      description:
        "Before dying, Scorpion stings its enemy inflicting 1 damage per round for the next 5 rounds.",
    },
    9,
    5
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
    6,
    3
  ),
  new Animal(
    "🦂",
    "Spider",
    "https://cdnmundo1.img.sputniknews.com/img/109135/72/1091357298_0:290:1920:1328_1000x541_80_0_0_5b55f584c4a63ff0ffeff88b86420468.jpg",
    {
      name: "Sticky wrapping",
      description:
        "Spider can weave its web wrapping and paralyzing the enemy, so it can't use its ability for 3 rounds.",
    },
    7,
    4
  ),
  new Animal(
    "🐺",
    "Bear",
    "https://www.vistazo.com/sites/default/files/styles/threshold-768/public/field/image/2020/05/22/oso-ataca-humano-rusia-vistazo.jpg?itok=__ohpoFM",
    {
      name: "Sharp claws",
      description:
        "Bear nails its claws making enemy bleed, inflicting 10% enemy's current life for the next 2 rounds.",
    },
    10,
    14
  ),
  new Animal(
    "🐺",
    "Lion",
    "https://www.bioenciclopedia.com/wp-content/uploads/2011/12/leon-800.jpg",
    {
      name: "Roar",
      description:
        "Lion roars and scares enemy so it can't attack for 3 rounds.",
    },
    12,
    12
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
    9,
    12
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
    9,
    9
  ),
  new Animal(
    "🐺",
    "Hyena",
    "https://i.pinimg.com/originals/31/da/8f/31da8f9afc9d01f748fb5d417b3710d9.jpg",
    {
      name: "Bite the wound",
      description: "Hyena can bite an injuried enemy, making 2 extra damage.",
    },
    7,
    8
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
    6,
    12
  ),
];

// Add plants to each hand like: antidote, healing plant, poisonous mushroom
// Add option to set terrains that can benefit animals families: sea, forest, sand, etc...

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

const getAnimalsInfo = () => {
  var reptile = animals.filter((animal) => animal.family === "🦎").length;
  var amphibian = animals.filter((animal) => animal.family === "🐸").length;
  var fish = animals.filter((animal) => animal.family === "🦈").length;
  var bird = animals.filter((animal) => animal.family === "🦅").length;
  var insect = animals.filter((animal) => animal.family === "🦂").length;
  var mammal = animals.filter((animal) => animal.family === "🐺").length;

  console.log(
    animals.length + " cards,",
    reptile + " reptiles,",
    amphibian + " amphibians,",
    fish + " fishes,",
    bird + " birds,",
    insect + " insects,",
    mammal + " mammals"
  );
};

export { animals, utilitiesIcons, getCards, getAnimalsInfo };
