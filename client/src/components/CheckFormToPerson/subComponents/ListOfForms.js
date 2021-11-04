import { Link } from "react-router-dom"
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { setContacts } from "../../../redux/actions/checkFormToPerson";
import { infoModalDeactivate } from "../../../redux/actions/modalInfoAC";

export const ListOfForms = ({forms}) => {
  const dispatch = useDispatch()
  const clickHandler = () => {
    dispatch(setContacts(forms[0]))
    dispatch(infoModalDeactivate())
  }
  console.log(forms)
  return (
    <div className="container-info">
    <h3>Хорошая новость! Пользователь уже заполнял анкет{forms.length === 1 ? 'у' : 'ы'}.</h3>
      <ol>
        {forms?.map(e => (
          <li key={e.id}>&nbsp;
            <b>Имя:  </b>{e.name} &nbsp;
            <b>Фамилия:  </b>{e.lname} &nbsp;
            <b>Дата заполнения анкеты:  
            </b> {moment(e.createdAt).format('ll')} 
            {e.isActive ? <Link to={`/presents/${e.id}`}>перейти в анкету</Link> : 
            <p>Анкета отправлена, но не заполнена пользователем. Ссылка на неё будет доступна после заполнения</p>}
          </li>))}
      </ol>
      <hr/>
      <button onClick={clickHandler} color="success" outline>Данные устарели? Отправить новую</button>
    </div>
  )
}
