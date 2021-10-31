import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router";
import CheckFormToPerson from "../../CheckFormToPerson/CheckFormToPerson";
import PresentForm from "../../presents/PresentForm/PresentForm";
import { useState, useEffect } from "react";
import { getExampleForm } from "../../../redux/actions/checkFormToPerson";
import { CSSTransition } from 'react-transition-group';
import { Main } from "./Main";

export default function Home() {

  const [showForm, setShowForm] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state=>state.user)
  useEffect(() => {
    setShowForm(false)
    dispatch(getExampleForm(false))
  }, [])

    const exampleForm = useSelector(state => state.exampleForm);

  return (
    <div className="container">
    <Main user={user}/>
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

// {showForm || <Main setShowForm={setShowForm} user={user}/>}
//     <CSSTransition in={showForm} classNames="transitions" timeout={400} unmountOnExit>
//       <CheckFormToPerson/>
//     </CSSTransition>
