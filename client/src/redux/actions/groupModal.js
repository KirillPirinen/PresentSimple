import { ALL_WISHES_PERSON, BIND_ALONE, CREATE_GROUP } from "../types/groupModalTypes";
import { getProgressbar } from "./Progressbar.ac";
import customFetch from "../../custom/customFetch";
import initPoints from "../../config/endPoints";

export const getAllWishes = (payload) => {
  return { type: ALL_WISHES_PERSON, payload };
};

export const getWishesPersonWatchPeople = (user_id) => async (dispatch) => {
  const {data, status} = await customFetch(dispatch, initPoints.getPersonWishes(user_id), 
    {credentials:"include"})
    if(status === 200) dispatch(getAllWishes(data));
};

export const addAlone = (wish_id) => async (dispatch) => {
  const {data, status} = await customFetch(dispatch, initPoints.addAlone, {
    method:"PATCH", credentials:'include',
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({wish_id})
  })
   if(status === 200) dispatch({type:BIND_ALONE, payload:wish_id})
};

export const addGroup = (maxusers, telegram, wish_id) => async (dispatch) => {
 const {status, data} = await customFetch(dispatch, initPoints.createGroup, {
   method:"POST",
   credentials:'include',
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify( {
    maxusers,telegram,wish_id
  })
 })
    if (status === 200) {
      dispatch({type:CREATE_GROUP, payload:data.group})
    } 
};

export const joinGroup = (wish_id) => async (dispatch) => {
   const {status, data} = await customFetch(dispatch, initPoints.joinGroup, {
   method:"PATCH",
   credentials:'include',
   headers:{"Content-Type":"application/json"},
   body:JSON.stringify({wish_id})
    })

    if (status === 200) {
      //dispatch(getProgressbar(response.data?.wishes?.Wishes));
    } else if (status === 202) {
      //dispatch(getProgressbar(response.data.groups));
    } else if (status === 201) {
      //dispatch(getProgressbar(response.data?.wishes?.Wishes));
    }
};
