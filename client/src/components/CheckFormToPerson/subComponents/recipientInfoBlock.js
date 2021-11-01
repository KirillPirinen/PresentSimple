import { Link } from "react-router-dom"

export const RecipientInfoBlock = ({recipient}) => {
  return (
      <div className="container-info"> 
        <h3>Отличная новость. Твой друг уже зарегистрирован. Список его желаний доступен на его страничке</h3>
        <h3><Link to={`/user/${recipient.id}`}>Cсылка на пользователя {recipient.name} {recipient.lname}</Link></h3>
      </div>
  )
}
