export type HandKey = "pc" | "user";

export interface Stat<T> {
  current: T;
  initial: number;
}

export interface Poisoned {
  damage: number;
  rounds: number;
}

export interface Skill {
  name: string;
  description: string;
  types: string[];
  toDo: (state: any, hand: HandKey) => any;
}

export interface IHands {
  [x: string]: IAnimal[];
}

export interface IPlants {
  pc: IPlant[];
  user: IPlant[];
}

export interface IPlant {
  name: string;
  description: string;
  image: string;
  toDo: (state: any, hand: HandKey) => any;
}

export interface IAnimal {
  name: string;
  species: string;
  image: string;
  attack: Stat<number>;
  life: Stat<number | string>;
  skill: Skill;
  poisoned: Poisoned;
  paralyzed: number;
  targeteable: boolean;
  bleeding: boolean;
}

export interface ITerrain {
  speciesToBuff: string;
  image: string;
  name: string;
  color: string;
  getRequiredXp: (current: number) => number;
}

export interface Game {
  created_at: string;
  terrain: string;
  xp_earned: number;
  won: boolean;
  usedAnimals: {
    user: { name: string; survived: boolean }[];
    pc: { name: string; survived: boolean }[];
  };
  usedPlants: {
    user: { name: string; applied: boolean }[];
    pc: { name: string; applied: boolean }[];
  };
}
