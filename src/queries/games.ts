import { Game } from "../interfaces";
import { ACPost } from "./user";
import { API_BASE_URL } from "../utils/constants";

export const newCampaignGame = (xp: number, user_cards: string[]) => {
  return fetch(
    `${API_BASE_URL}games/new-campaign?xp=${xp}&user_cards=${user_cards.join(
      ";"
    )}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const newRandomGame = () => {
  return fetch(`${API_BASE_URL}games/new-random`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const newTerrain = (xp?: number) => {
  const getTerrainName = () => {
    switch (xp) {
      case 0:
        return "neutral";
      case 450:
        return "neutral";
      case 900:
        return "neutral";
      case 1350:
        return "swamp";
      case 1800:
        return "desert";
      case 2250:
        return "mountain";
      case 2700:
        return "sea";
      case 3150:
        return "forest";
      case 3600:
        return "jungle";
      default:
        return "";
    }
  };
  const query = `?name=${getTerrainName()}`;
  return fetch(`${API_BASE_URL}terrains/new${query}`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const saveGameResult = (auth_id: string, game: Game) => {
  return fetch(`${API_BASE_URL}games/save-game`, {
    ...ACPost({ auth_id, game }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
