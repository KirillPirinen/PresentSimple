import { useDispatch, useSelector } from "react-redux"
import PresentForm from "../../presents/PresentForm/PresentForm";
import { useState, useEffect } from "react";
import { getExampleForm } from "../../../redux/actions/checkFormToPerson";
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
    const checkform = useSelector(state => state.checkform)

    const showAnswerFromBack = useSelector(state => state.showAnswerFromBack);

  return (
    <div className="container-glass">
    <Main user={user}/>
    </div>
  )
}
