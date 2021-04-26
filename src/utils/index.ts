import { IAnimal } from "../interfaces";

export const generateAnimationString = (percent: number) =>
  new Array(Math.floor(100 / percent))
    .fill("")
    .map((i, idx) => {
      return `${idx * percent}% {transform: rotate(${
        idx % 2 === 0 ? "0.35deg" : "-0.35deg"
      })}`;
    })
    .join(" ");

export const cardSpeciesToLowerCase = (species: string): string => {
  const splittedSpecies = species.split(" ");
  if (splittedSpecies.length > 1) {
    return splittedSpecies.join("-").toLowerCase();
  }
  return species.toLowerCase();
};

export const sortCardsAlphabetically = (cards: IAnimal[]): IAnimal[] => {
  return cards.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
};

export const capitalize = (string: string): string =>
  `${string[0].toUpperCase()}${string.substring(1).toLowerCase()}`;

export const getCurrentSection = (path: string): string =>
  ["/profile", "/campaign", "/collection"].includes(path)
    ? capitalize(path.substring(1))
    : "";

export const getCookie = (name: string) => {
  return document.cookie
    .split(";")
    .map((c) => c.trim())
    .find((c) => c.startsWith(name))
    ?.substring(5);
};
