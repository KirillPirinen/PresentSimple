import { getError, getInfo } from "../actions/error.ac"

export const errorMessageMiddleware = ({dispatch}) => next => action => {
  if(action?.payload?.error) {
    dispatch(getError(action.payload.error))
    return next({type:"undefined"});
  } else if (action?.payload?.message) {
    dispatch(getInfo(action.payload.message))
    return next({type:"undefined"});
  } else {
    let result = next(action);
    return result
  }  
}

