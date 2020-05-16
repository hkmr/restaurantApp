import { createStore } from "redux";
import rootReducer from "./reducers";

export const ConfigureStore = () => {
  const store = createStore(rootReducer);
  return store;
};
