import { combineReducers } from "redux";
import errorAuthReducer from "./errorAuthReducer";
import wishReducer from "./wishReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import { SentFormReducer } from "./SentFormReducer";
import { checkFormToPersonReducer } from "./checkFormToPersonReducer";
import { groupsReducer, wishesGroupAloneReducer } from "./groupModalReducer";
import wishlistReducer from "./wishlistReducer";
import { modalInfoReducer } from "./modalInfoReducer";
import progressbarReducer from "./progressbarReducer";

const rootReducer = combineReducers({
  wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  errorAuth: errorAuthReducer,
  sentForm: SentFormReducer,
  checkform: checkFormToPersonReducer,
  // exampleForm: getExampleFormReducer,
  groups: groupsReducer,
  wishlist: wishlistReducer,
  modalInfo: modalInfoReducer,
  wishesGroupAlone: wishesGroupAloneReducer,
  progressbar: progressbarReducer,
});

export default rootReducer;
