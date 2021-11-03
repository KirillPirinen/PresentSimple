import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkForm, clearCheckForm, createForm } from "../../redux/actions/checkFormToPerson";
import { RecipientInfoBlock } from "./subComponents/recipientInfoBlock";
import { ListOfForms } from "./subComponents/ListOfForms";
import ModalInfo from "../ModalInfo/ModalInfo";
import { infoModalActivate} from "../../redux/actions/modalInfoAC";
import { useHistory } from "react-router";
import {Button} from 'reactstrap'

export default function CheckFormToPerson() {
  const {recipient, forms, contacts, form} = useSelector(state=>state.checkform)
  const initialState = contacts ? contacts : {name: '', lname: '', phone: '', email: ''};
  const [inputFormToPerson, setInputFormToPerson] = useState(initialState);
  const history = useHistory()
  if(form?.id) history.push('/success')
  const dispatch = useDispatch();

  useEffect(()=>{
    if(recipient || forms) {
      dispatch(infoModalActivate())
    }
  },[recipient, forms])


  const changeHandler = (e) => {
    setInputFormToPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkFormHandler = (e) => {
    e.preventDefault();
    if(contacts) {
      dispatch(createForm(inputFormToPerson))
    } else {
      dispatch(clearCheckForm())
      if (inputFormToPerson) {
        dispatch(checkForm(inputFormToPerson.phone, inputFormToPerson.email))
      }
    }
  };

  return(
    <>
    <div className='container-glass'>
    {
      contacts ? <h3>Отправка пользователю анкеты-приглашения</h3> :<h3>Возможно твой друг уже зарегистрирован здесь и оставил список желаний. Давай проверим</h3>
    }
    <form onSubmit={checkFormHandler} className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
      
      {contacts && 
      <>
      <div className="mb-3">
      <input 
      name="name"
      className="form-control"
      type="text"
      placeholder="Имя" 
      value={inputFormToPerson.name}
      onChange={changeHandler}
      required
      />
      </div>
      
      <div className="mb-3">
      <input
      name="lname"
      className="form-control"
      type="text"
      placeholder="Фамилия" 
      value={inputFormToPerson.lname}
      onChange={changeHandler}
      required 
      />
      </div>
      </>}

      <div className="mb-3">
      <input 
      name="phone"
      className="form-control"
      type="text"
      placeholder="Телефон"
      required 
      value={inputFormToPerson.phone}
      onChange={changeHandler}
      />
      </div>

      <div className="mb-3">
      <input 
      name="email"
      className="form-control"
      type="email"
      required
      placeholder="Электронная почта" 
      value={inputFormToPerson.email}
      onChange={changeHandler}
      />
      </div>

      <Button type="submit" className="btn btn-primary">
        {contacts ? "Сгенерировать ссылку" : "Искать"}
      </Button>
    </form>
    </div>
      <ModalInfo>
        {recipient && <RecipientInfoBlock recipient={recipient}/>}
        {forms && <ListOfForms forms={forms}/>}
      </ModalInfo>
    </>
  )
}
