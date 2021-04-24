import { ITerrain } from "../interfaces";

export const utilitiesIcons = {
  attack: "/images/icons/attack-icon.png",
  fury: "/images/icons/fury-icon.png",
  blood: "/images/icons/blood-icon.png",
};

export const terrains: ITerrain[] = [
  {
    name: "Neutral",
    color: "#000",
    speciesToBuff: "",
    image: "/images/terrains/neutral.jpg",
  },
  {
    name: "Jungle",
    color: "#006400",
    speciesToBuff: "🐺",
    image: "/images/terrains/jungle.jpeg",
  },
  {
    name: "Sea",
    color: "#87CEEB",
    speciesToBuff: "🦈",
    image: "/images/terrains/sea.webp",
  },
  {
    name: "Swamp",
    color: "#228B22",
    speciesToBuff: "🐸",
    image: "/images/terrains/swamp.jpeg",
  },
  {
    name: "Desert",
    color: "#DEB887",
    speciesToBuff: "🦂",
    image: "/images/terrains/desert.jpeg",
  },
  {
    name: "Mountain",
    color: "#C0C0C0",
    speciesToBuff: "🦅",
    image: "/images/terrains/mountain.webp",
  },
  {
    name: "Forest",
    color: "#2E8B57",
    speciesToBuff: "🦎",
    image: "/images/terrains/forest.jpeg",
  },
];
