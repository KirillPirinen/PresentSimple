import { CLEAR_INFO } from "../types/errorTypes"
import { MODAL_INFO_DEACTIVATE } from "../types/modalTypes"
import { CHECK_FORM_UUID, CLEAR_SENTFORM, ERR_INTERNAL, FORM_DELIVERED, SEND_FILLING_FORM, SEND_FILLING_FORM_ERROR } from "../types/sentform.types"
import { clearInfo, getError } from "./error.ac"
import { disableLoader, enableLoader } from "./loader.ac"

export const CheckUUID = (uuid) => async (dispatch) => {
  dispatch(enableLoader())
  try {
    const response = await fetch(`http://localhost:3001/sentform/${uuid}`)
    const {status, data, message, guest} = await response.json()

    if(status) {
      dispatch({type:CHECK_FORM_UUID, payload:{status, data, guest}})
    } else {
      dispatch({type:CHECK_FORM_UUID, payload:{status, message}})
    }
    dispatch(disableLoader())
  } catch (err) {
      dispatch({type:ERR_INTERNAL, payload:err})
  }
}

export const SendForm = (uuid, data, history) => async (dispatch) => {
  dispatch(enableLoader())
  try {
    const response = await fetch(`http://localhost:3001/sentform/${uuid}`, {
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    })
    const {status, message, count} = await response.json()

    switch (status) {
      case "success":
        dispatch({type:SEND_FILLING_FORM, payload:{status, message, count}})
        setTimeout(() => {
          history.push('/')
          dispatch({type:MODAL_INFO_DEACTIVATE})
          dispatch({type:CLEAR_INFO})
          dispatch({type:CLEAR_SENTFORM})
        }, 3000);
        break;
      case "empty":
        dispatch({type:SEND_FILLING_FORM_ERROR, payload:{status, message}})
        break;
    }
    dispatch(disableLoader())
  } catch (err) {
      dispatch({type:ERR_INTERNAL, payload:err})
  }
}

export const deliverForm = uuid => async dispatch => {
  try {
    const response = await fetch(`http://localhost:3001/sentform/delivery/${uuid}`)
    const data = await response.json()
    dispatch({type:FORM_DELIVERED, payload:data})
    dispatch({type:CLEAR_SENTFORM})
  } catch (err) {
    dispatch(getError(err.message))
  }
}

