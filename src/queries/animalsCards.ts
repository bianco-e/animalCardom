const API_URL = "http://localhost:5000/";

export const getAllAnimalsCards = () =>
  fetch(`${API_URL}animals/all`)
    .then((res) => res.json())
    .catch((err) => console.error(err));

export const getFilteredAnimalsCards = (
  species?: string,
  skill_type?: string,
  owned?: string[]
) => {
  const ownedString = owned && owned.length ? owned.join(";") : undefined;
  return fetch(
    `${API_URL}animals/filter?${species ? `species=${species}&` : ""}${
      skill_type ? `skill_type=${skill_type}&` : ""
    }${ownedString ? `owned=${ownedString}` : ""}`
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));
};
