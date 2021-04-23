const API_URL = "http://localhost:5000/";

export const getOwnedCards = (auth_id: string) => {
  return fetch(`${API_URL}users/collection`, {
    method: "POST",
    body: auth_id,
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
