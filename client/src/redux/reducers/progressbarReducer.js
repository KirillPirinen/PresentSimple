import { DELETE_PROGRESSBAR, SHOW_PROGRESSBAR } from "../types/progressbarTypes";

const progressbarReducer = (state = [], action) => {
  switch (action.type) {
    case SHOW_PROGRESSBAR:
      return action.payload;
    case DELETE_PROGRESSBAR:
      return state.filter(el => el.id !== action.payload)

    default:
      return state;
  }
};

export default progressbarReducer;
