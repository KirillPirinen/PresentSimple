import { MODAL_INFO_ACTIVATE, MODAL_INFO_DEACTIVATE } from "../types/modalTypes";

export const modalInfoReducer = (state=false, action) => {
  switch (action.type) {
    case MODAL_INFO_ACTIVATE: return true
      
    case MODAL_INFO_DEACTIVATE: return false
  
    default: return state
  }
}
