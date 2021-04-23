const API_URL = "http://localhost:5000/";

export const getAllAnimalsCards = () =>
  fetch(`${API_URL}animals/all`)
    .then((res) => res.json())
    .catch((err) => console.error(err));
