import { combineReducers } from 'redux'
import wishReducer from './wishReducer'
import errorReducer from "./errorReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import {SentFormReducer} from "./SentFormReducer";
import { checkFormToPersonReducer, getExampleFormReducer } from './checkFormToPersonReducer';
import { modalInfoReducer } from './modalInfoReducer';
import infoReducer from './infoReducer';

const rootReducer = combineReducers({
  wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  error: errorReducer,
  sentForm: SentFormReducer,
  checkform: checkFormToPersonReducer,
  //exampleForm: getExampleFormReducer,
  modalInfo: modalInfoReducer,
  info: infoReducer,
})

export default rootReducer

