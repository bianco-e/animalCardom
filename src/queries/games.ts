import { IAnimal } from "../interfaces";
const API_URL = "http://localhost:5000/";

export const newCampaignGame = (level: number, user_cards: string[]) => {
  return fetch(
    `${API_URL}games/new-campaign?level=${level}&user_cards=${user_cards.join(
      ";"
    )}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const newRandomGame = () => {
  return fetch(`${API_URL}games/new-random`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const newTerrain = (level?: number) => {
  const campaignTerrains = [
    "neutral",
    "neutral",
    "neutral",
    "swamp",
    "desert",
    "mountain",
    "sea",
    "forest",
    "jungle",
  ];
  const query =
    level !== undefined ? `?name=${campaignTerrains[Math.floor(level)]}` : "";
  return fetch(`${API_URL}terrains/new${query}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
