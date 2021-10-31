import { GROUP_MODAL, GROUP, DONATE_TO_YOURSELF } from "../types/groupModalTypes";

export const groupModalReducer = (state=null, action) => {
  const {type, payload} = action;
  switch (type) {
    case GROUP_MODAL:
      return payload;
    default:
      return state;
  }
}

export const groupReducer = (state={}, action) => {
  const {type, payload} = action;
  switch (type) {
    case GROUP:
      return payload;
    case DONATE_TO_YOURSELF:
      return payload;
    default:
      return state;
  }
}
