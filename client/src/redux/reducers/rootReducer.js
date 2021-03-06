import { combineReducers } from "redux";
import wishReducer from "./wishReducer";
import loaderReducer from "./loaderReducer";
import userReducer from "./userReducer";
import { SentFormReducer } from "./SentFormReducer";
import { checkFormToPersonReducer } from "./checkFormToPersonReducer";
import { wishesGroupAloneReducer } from "./groupModalReducer";
import wishlistReducer from "./wishlistReducer";
import { modalInfoReducer } from "./modalInfoReducer";
import progressbarReducer from "./progressbarReducer";
import infoReducer from "./infoReducer";
import errorReducer from "./errorReducer";
import { presentReducer } from "./presentsReducer";

const rootReducer = combineReducers({
  wishes: wishReducer,
  user: userReducer,
  loader: loaderReducer,
  error: errorReducer,
  sentForm: SentFormReducer,
  checkform: checkFormToPersonReducer,
  // exampleForm: getExampleFormReducer,
  wishlist: wishlistReducer,
  modalInfo: modalInfoReducer,
  wishesGroupAlone: wishesGroupAloneReducer,
  info: infoReducer,
  progressbar: progressbarReducer,
  presents: presentReducer,
});

export default rootReducer;
