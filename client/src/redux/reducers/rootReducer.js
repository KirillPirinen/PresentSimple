import { combineReducers } from "redux";
import errorAuthReducer from "./errorAuthReducer";
import wishReducer from "./wishReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import { SentFormReducer } from "./SentFormReducer";
import { checkFormToPersonReducer } from "./checkFormToPersonReducer";
import {
  buttonsAddGroupReducer,
  buttonsAloneReducer,
  buttonsJoinGroupReducer,
  wishesGroupAloneReducer,
} from "./groupModalReducer";
import wishlistReducer from "./wishlistReducer";
import { modalInfoReducer } from "./modalInfoReducer";
import progressbarReducer from "./progressbarReducer";
import infoReducer from "./infoReducer";
import errorReducer from "./errorReducer";

const rootReducer = combineReducers({
  wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  errorAuth: errorAuthReducer,
  error: errorReducer,
  sentForm: SentFormReducer,
  checkform: checkFormToPersonReducer,
  // exampleForm: getExampleFormReducer,
  wishlist: wishlistReducer,
  modalInfo: modalInfoReducer,
  wishesGroupAlone: wishesGroupAloneReducer,
  info: infoReducer,
  progressbar: progressbarReducer,
  buttonsAlone: buttonsAloneReducer,
  buttonsAddGroup: buttonsAddGroupReducer,
  buttonsJoinGroup: buttonsJoinGroupReducer,
});

export default rootReducer;
