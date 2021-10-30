import { CHECK_FORM_UUID, ERR_INTERNAL, SEND_FILLING_FORM, SEND_FILLING_FORM_ERROR } from "../types/sentform.types"

export const CheckUUID = (uuid) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/sentform/${uuid}`)
    const {status, data, message, guest} = await response.json()

    if(status) {
      dispatch({type:CHECK_FORM_UUID, payload:{status, data, guest}})
    } else {
      dispatch({type:CHECK_FORM_UUID, payload:{status, message}})
    }

  } catch (err) {
      dispatch({type:ERR_INTERNAL, payload:err})
  }
}

export const SendForm = (uuid, data) => async (dispatch) => {
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
        break;
      case "empty":
        dispatch({type:SEND_FILLING_FORM_ERROR, payload:{status, message}})
        break;
    }
  } catch (err) {
      dispatch({type:ERR_INTERNAL, payload:err})
  }
}
