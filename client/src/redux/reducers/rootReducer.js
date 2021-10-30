import { combineReducers } from 'redux'
//import wishReducer from './taskReducer.js'
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import {SentFormReducer} from "./SentFormReducer";

const rootReducer = combineReducers({
  //wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  error: errorReducer,
  sentForm: SentFormReducer,
})

export default rootReducer

