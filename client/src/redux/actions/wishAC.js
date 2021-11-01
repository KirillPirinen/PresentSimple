import { ADD_WISH, ALL_WISHES, DELETE_WISH, EDIT_WISH } from "../types/types"

export function getAllWishes() {
  return async (dispatch) => {
    let response = await fetch('http://localhost:3001/wish')
    let result = await response.json()
    console.log(result);
    return dispatch({
      type: ALL_WISHES,
      payload: result
    })
  }
}

export function addNewWish(wish) {
  console.log(wish, '<<<<<<IZOOOOOOO');
  return async (dispatch) => {
    let response = await fetch('http://localhost:3001/wish', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(wish) 
    })
    const newWish = await response.json()
    return dispatch({
      type: ADD_WISH,
      payload: newWish,
    })
  }
}



// export function editWish(action) {
//   return async (dispatch) => {
//     let response = await fetch('http://localhost:3001/wish', {
//       method: 'PATCH',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8'
//       },
//       body: JSON.stringify(wish) 
//     })
//     let editedWish = response.json()

//     return dispatch({
//       type: EDIT_WISH,
//       payload: editedWish
//     })
//   }
// }

// export function delWish(id) {
//   return async (dispatch) => {
//     await fetch('http://localhost:3001/wish', {
//       method: 'DELETE'
//     })
//     return dispatch({
//       type: DELETE_WISH,
//       payload: id,
//     })
//   }
// }
