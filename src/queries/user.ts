const API_URL = "http://localhost:5000/";

const ACPost = (body: any) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

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
