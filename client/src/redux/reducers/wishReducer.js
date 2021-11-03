import { ALL_WISHES, ADD_WISH, EDIT_WISH, DELETE_WISH, WISH_IS_GIVEN } from '../types/types';

function wishReducer(state = {}, action) {
  switch (action.type) {
    case ALL_WISHES:
      return action.payload;

    case ADD_WISH:
      {
      const newState = {...state} 
      newState.Wishlist = {...newState.Wishlist} 
      newState.Wishlist.Wishes = [...newState.Wishlist.Wishes, action.payload]
      return newState }

    case EDIT_WISH:
      return state.map((wish) => {
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

    case DELETE_WISH:
      const newState = {...state}
      newState.Wishlist = {...newState.Wishlist}
      newState.Wishlist.Wishes = newState.Wishlist.Wishes.filter((wish) => wish.id !== action.payload);

      return newState

    case WISH_IS_GIVEN:
      return state.map((wish) => {
        if (Number(action.payload.id) === Number(wish.id)) {
          return { ...wish, isGiven: true };
        }
        return wish;
      });

    default:
      return state;
  }
}

export default wishReducer;
