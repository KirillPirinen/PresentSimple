import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from 'redux-thunk'
import getInitState from "./initState";
import rootReducer from "./reducers/rootReducer";

const store = createStore(rootReducer, getInitState(), composeWithDevTools(applyMiddleware(thunk)))

store.subscribe(() => {
  const state = store.getState();
  window.localStorage.setItem('redux', JSON.stringify(state))
})

export default store
