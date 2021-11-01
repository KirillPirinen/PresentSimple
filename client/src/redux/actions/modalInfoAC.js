import { MODAL_INFO_ACTIVATE, MODAL_INFO_DEACTIVATE } from "../types/modalTypes"

export const infoModalActivate = () => {
  return {type:MODAL_INFO_ACTIVATE}
}

export const infoModalDeactivate = () => {
  return {type:MODAL_INFO_DEACTIVATE}
}
