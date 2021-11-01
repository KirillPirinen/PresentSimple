import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { checkForm } from "../../redux/actions/checkFormToPerson";
import { RecipientInfoBlock } from "./subComponents/recipientInfoBlock";
import { ListOfForms } from "./subComponents/ListOfForms";

export default function CheckFormToPerson() {
  const [inputFormToPerson, setInputFormToPerson] = useState({name: '', lname: '', phone: '', email: ''});
  const {recipient, forms, message} = useSelector(state=>state.checkform)
  
  const dispatch = useDispatch();


  const changeHandler = (e) => {
    setInputFormToPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkFormHandler = (e) => {
    e.preventDefault();
    if (inputFormToPerson) {
      dispatch(checkForm(inputFormToPerson.name, inputFormToPerson.lname, inputFormToPerson.phone, inputFormToPerson.email))
    }
  };

  return(
    <>
    <div className='container-glass'>
    <h2>Возможно твой друг уже зарегистрирован здесь и оставил список желаний. Давай проверим</h2>
    <form onSubmit={checkFormHandler} className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3">
      
      <div className="mb-3">
      <input 
      name="name"
      className="form-control"
      type="text"
      placeholder="Имя" 
      value={inputFormToPerson.name}
      onChange={changeHandler}
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
      />
      </div>

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

      <button type="submit" className="btn btn-primary">
      Добавить
    </button>
    </form>
    </div>
    <div className="container-glass">
    {recipient &&
        <RecipientInfoBlock recipient={recipient}/>
    }
    {forms && <ListOfForms forms={forms}/>}

    {message && 
      <h2>{message}</h2>
    }
    </div>
    </>
  )
}
