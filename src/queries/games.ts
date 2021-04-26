import { Game } from "../interfaces";
import { ACPost } from "./user";
const API_URL = "http://localhost:5000/";

export const newCampaignGame = (xp: number, user_cards: string[]) => {
  return fetch(
    `${API_URL}games/new-campaign?xp=${xp}&user_cards=${user_cards.join(";")}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const newRandomGame = () => {
  return fetch(`${API_URL}games/new-random`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const newTerrain = (xp?: number) => {
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
    xp !== undefined ? `?name=${campaignTerrains[Math.floor(xp / 1000)]}` : "";
  return fetch(`${API_URL}terrains/new${query}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const saveGameResult = (auth_id: string, game: Game) => {
  return fetch(`${API_URL}games/save-game`, {
    ...ACPost({ auth_id, game }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
