import { Link } from "react-router-dom"
import moment from 'moment';
import { Button } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../../../redux/actions/checkFormToPerson";
import { infoModalDeactivate } from "../../../redux/actions/modalInfoAC";

export const ListOfForms = ({forms}) => {
  const dispatch = useDispatch()
  const clickHandler = () => {
    dispatch(setContacts(forms[0]))
    dispatch(infoModalDeactivate())
  }
  return (
    <div className="container-info">
    <h3>Хорошая новость! Пользователь уже заполнял анкет{forms.length === 1 ? 'у' : 'ы'}.</h3>
      <ol>
        {forms.map(e=> <li><b>Имя:  </b>{e.name} <b>Фамилия:  </b>{e.lname} <b>Дата заполнения анкеты:  </b> {moment(e.createdAt).format('ll')} <Link to={`/formroot/${e.id}`}>перейти в анкету</Link></li>)}
      </ol>
      <Button onClick={clickHandler} type="success" outline>Данные устарели? Отправить новую</Button>
    </div>
  )
}
