import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import getInitState, {initStateWithoutLS} from "./initState";
import { errorMessageMiddleware } from "./middleware/errorsMessage";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, getInitState(), composeWithDevTools(applyMiddleware(thunk, errorMessageMiddleware)))

store.subscribe(() => {
  const state = {...store.getState(), ...initStateWithoutLS};
  window.localStorage.setItem('redux', JSON.stringify(state))
})

export default store
