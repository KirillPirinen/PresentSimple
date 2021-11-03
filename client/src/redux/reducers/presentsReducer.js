import { GET_ALL_PRESENTS } from "../types/presentsTypes";

export const presentReducer = (state=[], action) => {
  switch (action.type) {
    case GET_ALL_PRESENTS:
      return action.payload
  
    default: return state
  }
}
