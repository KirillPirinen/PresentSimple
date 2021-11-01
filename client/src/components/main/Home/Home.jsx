import { useDispatch, useSelector } from "react-redux"
import PresentForm from "../../presents/PresentForm/PresentForm";
import { useState, useEffect } from "react";
import { getExampleForm } from "../../../redux/actions/checkFormToPerson";
import { Main } from "./Main";
import { Button } from "reactstrap";

export default function Home() {

  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  useEffect(() => {
    setShowForm(false)
    dispatch(getExampleForm(false))
  }, [])

    const exampleForm = useSelector(state => state.exampleForm);
    const checkform = useSelector(state => state.checkform)
    console.log('checkform', checkform)

    const showAnswerFromBack = useSelector(state => state.showAnswerFromBack);
    console.log('showAnswerFromBack', showAnswerFromBack)

  return (
    <div className="container-glass">
    <Main user={user}/>
     {/* <WishListPerson/> */}
    </div>
  )
}

// {showForm || <Main setShowForm={setShowForm} user={user}/>}
//     <CSSTransition in={showForm} classNames="transitions" timeout={400} unmountOnExit>
//       <CheckFormToPerson/>
//     </CSSTransition>

// {exampleForm ?
//   <>
//   <h2>Готовы ли Вы отправить ему эту анкету?</h2>
//   <div>
//     <form className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
//   <h2>Ура! Кто-то из твоих близких или знакомых хотят подарить Вам подарок! Заполните, пожалуйста, как можно больше полей</h2>
//   {/* <SentForm/> */}
//   <PresentForm/>
//   <Button onCLick={() => dispatch(sendFormToPerson(checkform))}>Отправляем 📧</Button>
//   <Button onCLick={() => dispatch(getExampleForm(false))}>Мне не нравится 😞</Button>
//   {showAnswerFromBack ?
//   <h2>Отправлено 💫</h2>
//   :
//   <h2>Не удалось отправить 😢</h2>}
//   </form>
//   </div>
//   </>
//    : '' }
