const API_URL = "http://localhost:5000/";

interface User {
  auth_id: string;
  picture: string;
  email: string;
  first_name: string;
  last_name: string;
  locale: string;
  preferences: {
    language: string;
  };
  xp: number;
  owned_cards: string[];
  hand: string[];
}

export const ACPost = (body: any) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const createUser = (user: User) => {
  return fetch(`${API_URL}users/create`, {
    ...ACPost(user),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getUserMe = (auth_id: string) => {
  return fetch(`${API_URL}users/me`, {
    ...ACPost({ auth_id }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getUserProfile = (auth_id: string) => {
  return fetch(`${API_URL}users/profile`, {
    ...ACPost({ auth_id }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const getLastGames = (auth_id: string) => {
  return fetch(`${API_URL}games/last-games?quantity=10`, {
    ...ACPost({ auth_id }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};

export const updateHand = (auth_id: string, hand: string[]) => {
  return fetch(`${API_URL}users/hand/update`, {
    ...ACPost({ auth_id, hand }),
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
