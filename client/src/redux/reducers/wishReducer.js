import {
  ALL_WISHES,
  ADD_WISH,
  EDIT_WISH,
  DELETE_WISH,
  WISH_IS_GIVEN,
} from "../types/types";

function wishReducer(state = {}, action) {
  switch (action.type) {
    case ALL_WISHES: {
      return action.payload;
    }

    case ADD_WISH: {
      const newState = { ...state };
      newState.Wishlist = { ...newState.Wishlist };
      newState.Wishlist.Wishes = [...newState.Wishlist.Wishes, action.payload];
      return newState;
    }

    case EDIT_WISH: {
      const newState = { ...state };
      newState.Wishlist = { ...newState.Wishlist };

      newState.Wishlist.Wishes = newState.Wishlist.Wishes.map((wish) => {
        if (Number(action.payload.id) === Number(wish.id)) {
          return {
            ...wish,
            WishPhoto: action.payload.WishPhoto,
            title: action.payload.title,
            description: action.payload.description,
          };
        }
        return wish;
      });
      return newState;
    }

    case DELETE_WISH: {
      const newState = { ...state };
      newState.Wishlist = { ...newState.Wishlist };
      newState.Wishlist.Wishes = newState.Wishlist.Wishes.filter(
        (wish) => wish.id !== action.payload
      );

      return newState;
    }

    case WISH_IS_GIVEN: {
      console.log(action, "GET ID SUKANAH");
      const newState = { ...state };
      newState.Wishlist = { ...newState.Wishlist };
      newState.Wishlist.Wishes = newState.Wishlist.Wishes.map((wish) => {
        if (Number(action.payload) === Number(wish.id)) {
          console.log(action, "GET ID SUKANAH222");
          return {
            ...wish,
            isGiven: true,
          };
        }
        return wish;
      });
      return newState;
    }

    default:
      return state;
  }
}

export default wishReducer;
