import { combineReducers } from "redux";
import { Dishes } from "./Dishes";
import { Comments } from "./Comments";
import { Promotions } from "./Promotions";
import { Leaders } from "./Leaders";

const rootReducer = combineReducers({
  dishes: Dishes,
  comments: Comments,
  promotions: Promotions,
  leaders: Leaders
});

export default rootReducer;
