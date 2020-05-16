import { COMMENTS } from "../../shared/comments";
import * as ActionTypes from "../actions/actionTypes";

export const Comments = (state = COMMENTS, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.length;
      comment.date = new Date().toISOString();
      // console.log("Comment Reducer: " + JSON.stringify(comment));
      const newstate = state.concat(comment);
      // console.log("New State:" + JSON.stringify(newstate));
      return newstate;

    default:
      return state;
  }
};
