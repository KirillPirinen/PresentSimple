import { GET_WISH_LIST } from "../types/wishlistTypes";

export function setWishList(value) {
  return {
    type: GET_WISH_LIST,
    payload: value,
  };
}
