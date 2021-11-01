const initState = {
  user: null,
  loader: false,
  errorAuth: "",
  wishes: [],
  sentForm:{},
  checkform: {},
  exampleForm: false,
  showAnswerFromBack: false,
  group: {},
  alone: {},
  wishlist: [],
};
const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
  return stateFromLS ? stateFromLS : initState
}


export default getInitState
