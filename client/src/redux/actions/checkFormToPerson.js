import initPoints from "../../config/endPoints";
import customFetch from "../../custom/customFetch";
import { ADD_USER, CHECK_FORM, CLEAR_CHECKFORM_STATE, CREATE_URL_FORM, GET_EXAMPLE_FORM, SET_CONTACTS, USER_OR_FORM_NOTFOUND } from "../types/checkFormToPersonTypes";


export const getCheckedForm = (payload) => ({
  type: CHECK_FORM, payload
});

export const getCheckedUser = (payload) => ({
  type: ADD_USER, payload
});

export const getExampleForm = (payload) => ({
  type: GET_EXAMPLE_FORM, payload
});

export const userOrFormNotFound = (payload) => {
  return {type:USER_OR_FORM_NOTFOUND, payload}
}

export const clearCheckForm = () => ({type:CLEAR_CHECKFORM_STATE})

export const setContacts = (contacts) => ({type:SET_CONTACTS, payload:contacts})

export const checkForm = (phone, email) => async (dispatch) => {
    const {status, data} = await customFetch(dispatch, initPoints.searchPersonOrForm, {
      method:"POST", credentials:'include',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({phone, email})
    })
    switch (status) {
      case 200: return dispatch(getCheckedUser(data));
      case 201: return dispatch(getCheckedForm(data));
      case 303:
      dispatch(userOrFormNotFound(data))
      dispatch(setContacts({phone, email}))
      // break;
      // default: dispatch(userOrFormNotFound(data))
    }
  };

export const createForm = values => async dispatch => {
    const {status, data} = await customFetch(dispatch, initPoints.createForm, {
      method:"POST",
      credentials:'include',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(values)
    })
    if(status === 200 || data.id) {
      dispatch({type:CREATE_URL_FORM, payload:data})
    } else {
      dispatch(userOrFormNotFound(data, values))
    }
}

