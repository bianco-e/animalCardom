import React, { createContext, useReducer } from "react";
import { SET_USERNAME } from "./types";
export type IUserContext = (IUserState | any)[];
export interface IUserAction {
  type: string;
  payload: string;
}
export interface IUserState {
  username: string;
}
const initialState = {
  username: "",
};
const Context = createContext<IUserContext>([initialState]);

const reducer = (state: IUserState, action: IUserAction) => {
  switch (action.type) {
    case SET_USERNAME:
      return { ...state, username: action.payload };
    default:
      return state;
  }
};

export const UserContext = ({ children }: { children: JSX.Element }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default Context;
