import {
  ALL_WISHES_PERSON,
  BUTTON_ALONE,
  BUTTON_ADD_GROUP,
  BUTTON_JOIN_GROUP,
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

export const buttonsAloneReducer = (state = true, action) => {
  const { type, payload } = action;
  switch (type) {
    case BUTTON_ALONE:
      return payload;
    default:
      return state;
  }
};

export const buttonsAddGroupReducer = (state = true, action) => {
  const { type, payload } = action;
  switch (type) {
    case BUTTON_ADD_GROUP:
      return payload;
    default:
      return state;
  }
};

export const buttonsJoinGroupReducer = (
  state = false,
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case BUTTON_JOIN_GROUP:
      return payload;
    default:
      return state;
  }
};
