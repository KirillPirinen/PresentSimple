import { ERROR_AUTH, CLEAR_ERROR_AUTH } from "../types/errorAuthTypes";

const errorAuthReducer = (state = '', action) => {
  switch (action.type) {
    case ERROR_AUTH:
      return action.payload;
    case CLEAR_ERROR_AUTH:
      return null;
    default:
      return state;
  }
};

export default errorAuthReducer;
