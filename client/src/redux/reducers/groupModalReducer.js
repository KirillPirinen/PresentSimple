import {
  ALL_WISHES_PERSON, BIND_ALONE, CREATE_GROUP,
} from "../types/groupModalTypes";

export const wishesGroupAloneReducer = (state = [], action) => {
  const { type, payload } = action;
  const newObj = Object.assign({}, state)
  switch (type) {
    case ALL_WISHES_PERSON:
      return payload;

    case BIND_ALONE: 
      newObj.Wishes = newObj.Wishes.map(e => e.id == payload ? {...e, isBinded:true} : e)
      return newObj

    case CREATE_GROUP: 
      newObj.Wishes = newObj.Wishes.map(e => e.id == payload.wish_id ? {...e, isBinded:true, Group:payload} : e)
      return newObj
    
      default: return state;
  }
};
