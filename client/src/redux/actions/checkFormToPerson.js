import { ADD_USER, CHECK_FORM, GET_EXAMPLE_FORM, USER_OR_FORM_NOTFOUND } from "../types/checkFormToPersonTypes";
import { getError } from "./error.ac";

export const getCheckedForm = (response) => ({
  type: CHECK_FORM,
  payload: response,
});

export const getCheckedUser = (response) => ({
  type: ADD_USER,
  payload: response,
});

export const getExampleForm = (value) => ({
  type: GET_EXAMPLE_FORM,
  payload: value,
});

export const userOrFormNotFound = (value, contacts) => {
  return {type:USER_OR_FORM_NOTFOUND, payload:value, contacts}
}

export const checkForm =
  (name, lname, phone, email) => async (dispatch) => {
    const response = await fetch('http://localhost:3001/api/v1/form/addPresentRecipient', {
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({name,lname,phone,email})
    })
    const data = await response.json()
    console.log('я дошел сюда')
    console.log(response.status)
    if (response.status === 200) {
      dispatch(getCheckedUser(data));
    } 
    else if (response.status === 201) {
      dispatch(getCheckedForm(data));
    }
      else if (response.status === 404) {
      const contacts = {name, lname, phone, email};
      dispatch(userOrFormNotFound(data, contacts))
      dispatch(getExampleForm(true));
      }
      else if(response.status === 500) {
      dispatch(userOrFormNotFound(data))
      }
    else {
      dispatch(getError("Произошла ошибка"));
    }
  };

  export const sendFormToPerson = (person) => async (dispatch) => {
    console.log('зашли в action')
    let response = await axios.post(`http://localhost:3001/api/v1/form/sendFormToPresentRecipient`, {person})
    console.log('response.data', response.data)
  if (response.status === 200) {
    dispatch(showAnswerFromBack(true));
  }
}
