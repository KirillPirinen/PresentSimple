import { ERROR, CLEAR_ERROR} from "../types/errorTypes";

const errorReducer = (state = '', action) => {
  switch (action.type) {
    case ERROR:
      return action.payload;
    case CLEAR_ERROR:
      return null;
    default:
      return state;
  }
};

export default errorReducer;
