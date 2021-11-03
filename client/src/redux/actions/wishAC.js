import { ADD_WISH, ALL_WISHES, DELETE_WISH, EDIT_WISH } from '../types/types';

export function getAllWishes() {
  return async (dispatch) => {
    let response = await fetch('http://localhost:3001/wish', {credentials: 'include'});
    let result = await response.json();
    return dispatch({
      type: ALL_WISHES,
      payload: result,
    });
  };
}

export function addNewWish(wish) {
  return async (dispatch) => {
    let response = await fetch('http://localhost:3001/wish', {
      method: 'POST',
      credentials: 'include',
      body: wish,
    });
    const newWish = await response.json();
    return dispatch({
      type: ADD_WISH,
      payload: newWish,
    });
  };
}

export function editWish(wish) {
  console.log(wish, 'зашел в экшн');
  return async (dispatch) => {
    let response = await fetch('http://localhost:3001/wish', {
      method: 'PATCH',
      credentials: 'include',
      body: wish,
    })
    const result = await response.json()
    console.log(result, 'reeeesuuuultfromserverrr');
    console.log(Object.fromEntries(wish), 'THIS IS WISH FOR EDIT');
    if(result.status == 200) {
     const editedWish = Object.fromEntries(wish)
      const editedWishWithPhoto = {...editedWish, WishPhoto: {image: result.filePath}}
      console.log(editedWishWithPhoto, "footooooooo");
      return dispatch({
        type: EDIT_WISH,
        payload: editedWishWithPhoto
      })
    }
  }
}

export function delWish(id) {
  return async (dispatch) => {
    await fetch(`http://localhost:3001/wish/${id}`, {
      method: 'DELETE',
    })
    return dispatch({
      type: DELETE_WISH,
      payload: id,
    })
  }
}
