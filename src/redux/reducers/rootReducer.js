import { combineReducers } from 'redux'
import wishReducer from './taskReducer.js'


const rootReducer = combineReducers({
  wishes: wishReducer,
})

export default rootReducer;


