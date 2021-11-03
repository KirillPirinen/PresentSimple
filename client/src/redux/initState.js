//состояния подписанные на LocalStorage
const initState = {
  user: null,
  loader: false,
  exampleForm: false,
  showAnswerFromBack: false,
};

//состояния не подписанные на LocalStorage

export const initStateWithoutLS = {
  sentForm:{},
  checkform: {},
  modalInfo:false,
  error: false,
  info: false,
  presents:[],
  wishes: {},
};

const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
  return stateFromLS ? {...stateFromLS, ...initStateWithoutLS} : {...initState, ...initStateWithoutLS}
}


export default getInitState
