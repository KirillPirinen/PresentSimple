import { Link } from "react-router-dom"
import {useDispatch} from 'react-redux';
import { infoModalDeactivate } from "../../../redux/actions/modalInfoAC";

export const RecipientInfoBlock = ({recipient}) => {
  const dispatch = useDispatch()
  const clickLink = () => {
    dispatch(infoModalDeactivate())
  }
  return (
      <div className="container-info"> 
        <h3>Отличная новость. Твой друг уже зарегистрирован. Список его желаний доступен на его страничке</h3>
        <h3><Link onClick={clickLink} to={`/wishListPerson/${recipient.id}`}>Cсылка на пользователя {recipient.name} {recipient.lname}</Link></h3>
      </div>
  )
}
