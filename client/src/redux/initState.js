const initState = {
  user: null,
  loader: false,
  error: '',
  wishes: [],
  sentForm:{}
}
const getInitState = () => {
  const stateFromLS = JSON.parse(window.localStorage.getItem('redux'))
  return stateFromLS ? stateFromLS : initState
}


export default getInitState
