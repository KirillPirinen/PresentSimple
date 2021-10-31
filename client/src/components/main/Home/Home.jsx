import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import CheckFormToPerson from "../../CheckFormToPerson/CheckFormToPerson";
import PresentForm from "../../presents/PresentForm/PresentForm";
import { useState, useEffect } from "react";
import { getExampleForm } from "../../../redux/actions/checkFormToPerson";
import { CSSTransition } from 'react-transition-group';

export default function Home() {

  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setShowForm(false)
    dispatch(getExampleForm(false))
  }, [])

    const user = useSelector(state => state.user);
    const exampleForm = useSelector(state => state.exampleForm);

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
     <button onClick={() => !user ? history.push('/auth/signup') : setShowForm(true)}>Да</button>
    </div>
    <CSSTransition in={showForm} classNames="transitions" timeout={400} unmountOnExit>
      <CheckFormToPerson/>
    </CSSTransition>
     {/* <WishListPerson/> */}
    {exampleForm ?
    
    <>
    <h2>Мы не нашли его список желаний</h2>
    <h2>Готовы ли Вы отправить ему эту анкету?</h2>
    <div>
    <h2>Ура! Кто-то из твоих близких или знакомых хотят подарить Вам подарок! Заполните, пожалуйста, как можно больше полей</h2>
    <PresentForm/>
    </div>
    </>
     : '' }
    </div>
  )
}
