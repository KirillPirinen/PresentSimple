import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import { deliverForm } from "../../redux/actions/SentForm.ac"
import ModalInfo from "../ModalInfo/ModalInfo"

export const SuccessAdded = () => {
  const {form} = useSelector(state=>state.checkform)
  const history = useHistory()
  const dispatch = useDispatch()
  const clickHandler = () => {
    dispatch(deliverForm(form.id))
  }
  return (
    <>
   {form?.id ? <div className="container-glass">
   <h3>Поздравляем, форма успешно сгенерирована</h3>
   <p>Ссылка на анкету для друга:</p> 
   <span>
     <a href={`http://localhost:3000/sentform/${form.id}`}>{`http://localhost:3000/sentform/${form.id}`}</a>
   </span>
   <p>Можете отправить ссылку другу самостоятельно либо доверить отправку нам.
     Отправим анонимно, на почтовый ящик указанный Вами при заполнении контактных данных.
   </p>
   <p>
     Вам будет направлено письмо, когда Ваш друг заполнит анкету. Также информация будет доступна в вашем личном кабинете.
   </p>
   <button type="success" onClick={clickHandler} outline>Отправить анонимно</button>
 </div> : 
 <div className="container-glass">
   <h2>Нет данных</h2>
   <a href="/" onClick={()=>history.push('/')}>На главную</a>
 </div>
 }
  <ModalInfo/>
    </>
  )
}
