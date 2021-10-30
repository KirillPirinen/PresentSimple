const { CHECK_FORM_UUID, SEND_FILLING_FORM } = require("../types/sentform.types");

export const SentFormReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_FORM_UUID: 
      return action.payload.status ? {status:true, data:action.payload.data, guest:action.payload.guest} : {status:false, message:action.payload.message}

    case SEND_FILLING_FORM: return {status:false, message:action.payload.message}
      
    default: return state;
  }
}
