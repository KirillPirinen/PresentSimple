import { ADD_USER, CHECK_FORM, CLEAR_CHECKFORM_STATE, CREATE_URL_FORM, GET_EXAMPLE_FORM, SET_CONTACTS, USER_OR_FORM_NOTFOUND } from "../types/checkFormToPersonTypes";

export const checkFormToPersonReducer = (state = {}, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHECK_FORM:
      return { status: true, forms: payload };

    case USER_OR_FORM_NOTFOUND:
      return {status:false, ...payload}

    case ADD_USER:
      return { status: true, recipient: payload };

    case CREATE_URL_FORM:
      return {status:true, form:payload}
    
    case CLEAR_CHECKFORM_STATE: return {}
    
    case SET_CONTACTS: return {contacts:payload}

    default:
      return state;
  }
};

// export const getExampleFormReducer = (state = false, action) => {
//   const { type, payload } = action;

//   switch (type) {
//     case GET_EXAMPLE_FORM:
//       return payload;
//     case SHOW_ANSWER_FROM_BACK:
//       return payload;
//     default:
//       return state;
//   }
// };
