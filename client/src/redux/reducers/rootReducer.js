import { combineReducers } from 'redux'
//import wishReducer from './taskReducer.js'
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import {SentFormReducer} from "./SentFormReducer";
import { checkFormToPersonReducer, getExampleFormReducer } from './checkFormToPersonReducer';
import { groupModalReducer, groupReducer } from './groupModalReducer';

const rootReducer = combineReducers({
  //wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  error: errorReducer,
  sentForm: SentFormReducer,
  checkform: checkFormToPersonReducer,
  exampleForm: getExampleFormReducer,
  modalGroup: groupModalReducer,
  group: groupReducer,
})

export default rootReducer

