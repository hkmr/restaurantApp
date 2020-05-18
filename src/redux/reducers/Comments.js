import * as ActionTypes from "../actions/actionTypes";

export const Comments = (state = { errMsg: null, comments: [] }, action) => {
  switch (action.type) {
    case ActionTypes.ADD_COMMENTS:
      return { ...state, errMsg: null, comments: action.payload };

    case ActionTypes.COMMENTS_FAILED:
      return { ...state, errMsg: action.payload };

    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      comment.id = state.comments.length;
      comment.date = new Date().toISOString();
      const newstate = state.comments.concat(comment);
      return { ...state, comments: newstate };

    default:
      return state;
  }
};
