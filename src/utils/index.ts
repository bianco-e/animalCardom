import { IAnimal } from "../interfaces";

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

export const getNewUserTemplate = (user: {
  sub: string;
  picture: string;
  email: string;
  given_name: string;
  family_name: string;
  locale: string;
}) => {
  const initialAnimals = [
    "Alligator",
    "Basilisk Lizard",
    "Little Lion",
    "Octopus",
    "Vulture",
  ];
  const { sub, picture, email, given_name, family_name, locale } = user;
  return {
    auth_id: sub,
    picture,
    email,
    first_name: given_name,
    last_name: family_name,
    locale,
    preferences: {
      language: "en",
    },
    xp: 0,
    owned_cards: initialAnimals,
    hand: initialAnimals,
  };
};
