import { Link } from "react-router-dom"
import moment from 'moment';

export const ListOfForms = ({forms}) => {
  return (
    <div className="container-info">
    <h3>Хорошая новость! Пользователь уже заполнял анкет{forms.length === 1 ? 'у' : 'ы'}.</h3>
      <ol>
        {forms.map(e=> <li><b>Имя:  </b>{e.name} <b>Фамилия:  </b>{e.lname} <b>Дата заполнения анкеты:  </b> {moment(e.createdAt).format('ll')} <Link to={`/formroot/${e.id}`}>перейти в анкету</Link></li>)}
      </ol>
    </div>
  )
}
