import { useHistory } from "react-router"

export const Main = ({setShowForm, user}) => {
  const history = useHistory()
  return (
    <div className="container">
      <h1>Добро пожаловать на сайт подарков Present Simple!</h1>
      <div>
      <h2>Хотите составить список своих желаний подарков?</h2>
      <button onClick={() => user ? history.push('/mywishlist') : history.push('/auth/signup')}>Очень хочу!!!</button>
      </div>
      <div>
      <h2>Выбираете подарок и не знаете, что подарить?</h2>
      <button onClick={() => !user ? history.push('/auth/signup') : history.push('/search')}>Да</button>
      </div>
    </div>
  )
}
