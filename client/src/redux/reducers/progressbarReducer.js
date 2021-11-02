import { DELETE_PROGRESSBAR, SHOW_PROGRESSBAR } from "../types/progressbarTypes";

const progressbarReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_PROGRESSBAR:
      return action.payload;
    // case DELETE_PROGRESSBAR:
    //   return null

    default:
      return state;
  }
};

export default progressbarReducer;
