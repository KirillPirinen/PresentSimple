const { CHECK_FORM_UUID } = require("../types/sentform.types");

export const SentFormReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_FORM_UUID: return action.payload.status ? {status:true} : {status:false, message:action.payload.message}

    default: return state;
  }
}
