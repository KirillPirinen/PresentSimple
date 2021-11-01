import { combineReducers } from "redux";
import errorAuthReducer from "./errorAuthReducer";
import wishReducer from "./wishReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import { SentFormReducer } from "./SentFormReducer";
import { checkFormToPersonReducer } from "./checkFormToPersonReducer";
import { groupModalReducer, groupReducer } from "./groupModalReducer";
import wishlistReducer from "./wishlistReducer";
import { modalInfoReducer } from "./modalInfoReducer";

const rootReducer = combineReducers({
  wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  errorAuth: errorAuthReducer,
  sentForm: SentFormReducer,
  checkform: checkFormToPersonReducer,
  // exampleForm: getExampleFormReducer,
  modalGroup: groupModalReducer,
  group: groupReducer,
  wishlist: wishlistReducer,
  //exampleForm: getExampleFormReducer,
  modalInfo: modalInfoReducer,
});

export default rootReducer;
