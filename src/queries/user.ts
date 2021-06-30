import { UserTemplate } from "../interfaces";
import { API_BASE_URL } from "../utils/constants";

export const ACPost = (body: any) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const createUser = (user: UserTemplate) => {
  return fetch(`${API_BASE_URL}users/create`, {
    ...ACPost(user),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getUserMe = (auth_id: string) => {
  return fetch(`${API_BASE_URL}users/me`, {
    ...ACPost({ auth_id }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getUserProfile = (auth_id: string) => {
  return fetch(`${API_BASE_URL}users/profile`, {
    ...ACPost({ auth_id }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getLastGames = (auth_id: string) => {
  return fetch(`${API_BASE_URL}games/last-games?quantity=10`, {
    ...ACPost({ auth_id }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const updateHand = (auth_id: string, hand: string[]) => {
  return fetch(`${API_BASE_URL}users/hand/update`, {
    ...ACPost({ auth_id, hand }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const animalPurchase = (
  auth_id: string,
  new_card: string,
  price: number
) => {
  return fetch(`${API_BASE_URL}users/animal_purchase`, {
    ...ACPost({ auth_id, new_card, price }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
