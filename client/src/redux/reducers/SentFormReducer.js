const { CHECK_FORM_UUID } = require("../types/sentform.types");

export const SentFormReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_FORM_UUID: 
    console.log(action.payload)
      return action.payload.status ? {status:true, data:action.payload.data, guest:action.payload.guest} : {status:false, message:action.payload.message}

    default: return state;
  }
}
