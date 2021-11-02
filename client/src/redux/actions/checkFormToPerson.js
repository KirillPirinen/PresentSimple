import { ADD_USER, CHECK_FORM, CLEAR_CHECKFORM_STATE, CREATE_URL_FORM, GET_EXAMPLE_FORM, USER_OR_FORM_NOTFOUND } from "../types/checkFormToPersonTypes";
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
  return {type:USER_OR_FORM_NOTFOUND, payload:{...value, contacts}}
}

export const checkForm =
  (phone, email) => async (dispatch) => {
    const response = await fetch('http://localhost:3001/api/v1/form/addPresentRecipient', {
      method:"POST",
      credentials:'include',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({phone, email})
    })
    const data = await response.json()
    if (response.status === 200) {
      dispatch(getCheckedUser(data));
    } 
    else if (response.status === 201) {
      dispatch(getCheckedForm(data));
    }
      else if (response.status === 404) {
      const contacts = {phone, email};
      dispatch(userOrFormNotFound(data, contacts))
      //dispatch(getError(data.message))
      //dispatch(getExampleForm(true));
      }
      else if(response.status === 500) {
      //dispatch(userOrFormNotFound(data))
      dispatch(getError(data.message))
      }
    else {
      dispatch(getError("Произошла ошибка"));
    }
  };

export const createForm = values => async dispatch => {
  try {
    const response = await fetch('http://localhost:3001/api/v1/form/addPresentRecipient/new', {
      method:"POST",
      credentials:'include',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(values)
    })
    const data = await response.json()
    if(response.status === 200 || data.id) {
      dispatch({type:CREATE_URL_FORM, payload:data})
    } else {
      dispatch(userOrFormNotFound(data, values))
    }
  } catch(err) {
    console.log(err)
  }
}

export const clearCheckForm = () => ({type:CLEAR_CHECKFORM_STATE})
