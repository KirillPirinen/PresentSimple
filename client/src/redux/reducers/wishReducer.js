import { WISH_BINDED } from "../types/groupModalTypes";
import { ALL_WISHES, ADD_WISH, EDIT_WISH, DELETE_WISH } from "../types/types";

function wishReducer(state = [], action) {
  switch (action.type) {
    case ALL_WISHES:
      return action.payload;

    case ADD_WISH:
      return [...state, action.payload];

    case EDIT_WISH:
      return state.map((wish) => {
        if(Number(action.payload.id) === Number(wish.id)) {
          return {...wish,
            WishPhoto: action.payload.WishPhoto,
            title: action.payload.title,
            description: action.payload.description,
          };
        }
        return wish;
      });

    case DELETE_WISH:
      return state.filter((wish) => wish.id !== action.payload);

    default:
      return state;
  }
}

export default wishReducer;
