import { useSentFormContext } from "../../components/context/SentFormContext"
import { CHECK_FORM_UUID, ERR_CHECK_UUID } from "../types/sentform.types"

export const CheckUUID = (uuid) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3001/sentform/${uuid}`)
    const status = await response.json()

    if(status.checked) {
      dispatch({type:CHECK_FORM_UUID, payload:{status:true, data:status.data}})
    } else {
      dispatch({type:CHECK_FORM_UUID, payload:{status:false, message:status.message}})
    }

  } catch (err) {
      dispatch({type:ERR_CHECK_UUID, payload:err})
  }
}