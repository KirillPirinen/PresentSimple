import {
  ALL_WISHES_PERSON,
} from "../types/groupModalTypes";

export const wishesGroupAloneReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_WISHES_PERSON:
      return payload;
    default:
      return state;
  }
};
