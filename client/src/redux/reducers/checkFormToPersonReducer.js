import { ADD_USER, CHECK_FORM, GET_EXAMPLE_FORM, USER_OR_FORM_NOTFOUND } from "../types/checkFormToPersonTypes";

export const checkFormToPersonReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_FORM:
      return {status:true, forms:payload};

    case USER_OR_FORM_NOTFOUND:
      return {status:false, message:payload.message};

    case ADD_USER:
      return {status:true, recipient:payload};

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
