import { CHECK_FORM, GET_EXAMPLE_FORM } from "../types/checkFormToPersonTypes";

export const checkFormToPersonReducer = (state = '', action) => {
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
    default:
      return state;
  }
};
