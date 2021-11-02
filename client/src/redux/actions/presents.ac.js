import { GET_ALL_PRESENTS } from "../types/presentsTypes"
import { getError } from "./error.ac"

export const getAllPresents = uuid => async dispatch => {
  try {
    const response = await fetch(`http://localhost:3001/presents/${uuid}`, {credentials:'include'})
    const data = await response.json()
    dispatch({type:GET_ALL_PRESENTS, payload:data})
  } catch (err) {
    dispatch(getError(err))
  }
}
