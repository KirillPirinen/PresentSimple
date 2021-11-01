//состояния подписанные на LocalStorage
const initState = {
  user: null,
  loader: false,
  errorAuth: "",
  wishes: [],
  sentForm:{},
  exampleForm: false,
  showAnswerFromBack: false,
  group: {},
  alone: {},
  wishlist: [],
};

//состояния не подписанные на LocalStorage

export const initStateWithoutLS = {
  checkform: {},
  modalInfo:false
};

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
  return stateFromLS ? {...stateFromLS, ...initStateWithoutLS} : {...initState, ...initStateWithoutLS}
}


export default getInitState
