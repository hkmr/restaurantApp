import { createStore } from "redux";
import { InitialState, Reducer } from "./reducer";

export const ConfigureStore = () => {
  const store = createStore(Reducer, InitialState);
  return store;
};
