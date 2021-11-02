const { CHECK_FORM_UUID, SEND_FILLING_FORM, ERR_INTERNAL, SEND_FILLING_FORM_ERROR, FORM_DELIVERED, CLEAR_SENTFORM } = require("../types/sentform.types");

export const SentFormReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_FORM_UUID: 
      return action.payload.status ? {status:true, data:action.payload.data, guest:action.payload.guest} : {status:false, message:action.payload.message}

    case SEND_FILLING_FORM: return {status: false, message:action.payload.message, count:action.payload.count}

    case SEND_FILLING_FORM_ERROR: return {status:false, message:action.payload.message}

    case ERR_INTERNAL: return {status:false, message:action.payload}

    case FORM_DELIVERED: return action.payload;

    case CLEAR_SENTFORM: return {}
      
    default: return state;
  }
}


