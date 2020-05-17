import { combineReducers } from "redux";
import { Dishes } from "./Dishes";
import { Comments } from "./Comments";
import { Promotions } from "./Promotions";
import { Leaders } from "./Leaders";
import { createForms } from "react-redux-form";
import { InitialStates } from "./forms";

const rootReducer = combineReducers({
  dishes: Dishes,
  comments: Comments,
  promotions: Promotions,
  leaders: Leaders,
  ...createForms({
    feedback: InitialStates
  })
});

export default rootReducer;
