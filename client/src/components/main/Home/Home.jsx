import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import CheckFormToPerson from "../../CheckFormToPerson/CheckFormToPerson";
import PresentForm from "../../presents/PresentForm/PresentForm";
import { useState, useEffect } from "react";
import { getExampleForm, sendFormToPerson } from "../../../redux/actions/checkFormToPerson";
import { SentForm } from "../../SentForm/SentForm";
import { Button } from "reactstrap";

export default function Home() {

  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setShowForm(false)
    dispatch(getExampleForm(false))
  }, [])

    const user = useSelector(state => state.user);
    const exampleForm = useSelector(state => state.exampleForm);
    const checkform = useSelector(state => state.checkform)
    console.log('checkform', checkform)

    const showAnswerFromBack = useSelector(state => state.showAnswerFromBack);
    console.log('showAnswerFromBack', showAnswerFromBack)

    const history = useHistory()

  return (
    <>
    <h1>Добро пожаловать на сайт подарков Present Simple!</h1>
    <div>
    <h2>Хотите составить список своих желаний подарков?</h2>
     <button onClick={() => user ? history.push('/mywishlist') : history.push('/auth/signup')}>Очень хочу!!!</button>
    </div>
    <div>
    <h2>Выбираете подарок и не знаете, что подарить?</h2>
     <button onClick={() => setShowForm(true)}>Да</button>
    </div>
    {showForm ?
      <CheckFormToPerson/>
      : '' }
     {/* <WishListPerson/> */}
    {exampleForm ?
    <>
    <h2>Готовы ли Вы отправить ему эту анкету?</h2>
    <div>
      <form className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
    <h2>Ура! Кто-то из твоих близких или знакомых хотят подарить Вам подарок! Заполните, пожалуйста, как можно больше полей</h2>
    {/* <SentForm/> */}
    <PresentForm/>
    <Button onCLick={() => dispatch(sendFormToPerson(checkform))}>Отправляем 📧</Button>
    <Button onCLick={() => dispatch(getExampleForm(false))}>Мне не нравится 😞</Button>
    {showAnswerFromBack ?
    <h2>Отправлено 💫</h2>
    :
    <h2>Не удалось отправить 😢</h2>}
    </form>
    </div>
    </>
     : '' }
    </>
  )
}
