//состояния подписанные на LocalStorage
const initState = {
  user: null,
  loader: false,
  wishes: [],
  exampleForm: false,
  showAnswerFromBack: false,
  presents:[]
};

//состояния не подписанные на LocalStorage

export const initStateWithoutLS = {
  sentForm:{},
  checkform: {},
  modalInfo:false,
  error: false,
  info: false,
};

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
  return stateFromLS ? {...stateFromLS, ...initStateWithoutLS} : {...initState, ...initStateWithoutLS}
}


export default getInitState
