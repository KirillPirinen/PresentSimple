import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  user: userReducer,
  loader: loaderReducer,
  error: errorReducer,
})

export default rootReducer
