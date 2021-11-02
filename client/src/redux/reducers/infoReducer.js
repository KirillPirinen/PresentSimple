import { INFO, CLEAR_INFO} from "../types/errorTypes";

const infoReducer = (state = '', action) => {
  switch (action.type) {
    case INFO:
      return action.payload;
    case CLEAR_INFO:
      return null;
    default:
      return state;
  }
};

export default infoReducer;
