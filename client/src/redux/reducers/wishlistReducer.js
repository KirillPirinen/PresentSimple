import { GET_WISH_LIST } from "../types/wishlistTypes";

function wishlistReducer(state = [], action) {
  switch (action.type) {
    case GET_WISH_LIST:
      return action.payload;

    default:
      return state;
  }
}

export default wishlistReducer;
