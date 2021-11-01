import { CHECK_FORM, GET_EXAMPLE_FORM, SHOW_ANSWER_FROM_BACK } from "../types/checkFormToPersonTypes";

export const checkFormToPersonReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_FORM:
      return payload;
    default:
      return state;
  }
};

export const getExampleFormReducer = (state = false, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_EXAMPLE_FORM:
      return payload;
    case SHOW_ANSWER_FROM_BACK:
      return payload;
    default:
      return state;
  }
};
