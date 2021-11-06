import { getError, getInfo } from "../actions/error.ac"

export const errorMessageMiddleware = ({dispatch}) => next => action => {
  if(action.payload?.hasOwnProperty("error")) {
    dispatch(getError(action.payload.error))
  } else if (action.payload?.hasOwnProperty("info")) {
    dispatch(getInfo(action.payload.info))
  } else {
    console.log(action)
    return next(action);
  }  
}

