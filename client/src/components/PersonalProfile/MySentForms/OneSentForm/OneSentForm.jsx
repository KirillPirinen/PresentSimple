import {Link} from 'react-router-dom'
import style from "./styles.module.css"

function OneSentForm({name, lname, isActive, id}) {

  return (
    <div className={isActive ? `${style['active']}` : `${style['notactive']}`}>
    <div>
      <Link to={`presents/${id}`}><p>{`Пользователь ${name} ${lname} ${isActive ? 'заполнил' : 'ещё не заполнил'} анкету`}</p></Link>
    </div>
    </div>
  )
}

export default OneSentForm
