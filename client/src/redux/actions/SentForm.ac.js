import { CHECK_FORM_UUID, ERR_CHECK_UUID, SEND_FILLING_FORM } from "../types/sentform.types"

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
      dispatch({type:ERR_CHECK_UUID, payload:err})
  }
}

export const SendForm = (uuid, data) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/sentform/${uuid}`, {
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(data)
    })
    const {status, message} = await response.json()

    if(status) {
      dispatch({type:SEND_FILLING_FORM, payload:{status, message}})
    } 

  } catch (err) {
      dispatch({type:ERR_CHECK_UUID, payload:err})
  }
}
