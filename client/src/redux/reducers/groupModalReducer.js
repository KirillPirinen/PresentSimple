import {
  GROUP,
  ALL_WISHES_PERSON,
} from "../types/groupModalTypes";

export const groupsReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case GROUP:
      return payload;
    default:
      return state;
  }
};

export const wishesGroupAloneReducer = (state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case ALL_WISHES_PERSON:
      return payload;
    default:
      return state;
  }
};
