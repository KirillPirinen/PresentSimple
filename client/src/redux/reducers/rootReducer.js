import { combineReducers } from 'redux'
//import wishReducer from './taskReducer.js'
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  //wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  error: errorReducer,
})

export default rootReducer

