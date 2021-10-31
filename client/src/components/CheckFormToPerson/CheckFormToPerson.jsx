import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useHistory } from "react-router";
import { checkForm } from "../../redux/actions/checkFormToPerson";

export default function CheckFormToPerson() {
  const [inputFormToPerson, setInputFormToPerson] = useState({name: '', lname: '', phone: '', email: ''});
  const {recipient, forms, message} = useSelector(state=>state.checkform)
  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler = (e) => {
    setInputFormToPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkFormHandler = (e) => {
    e.preventDefault();
    if (inputFormToPerson) {
      dispatch(checkForm(inputFormToPerson.name, inputFormToPerson.lname, inputFormToPerson.phone, inputFormToPerson.email, history))
      setInputFormToPerson({name: '', lname: '', phone: '', email: ''});
    }
  };

  return(
    <div>
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
      value={inputFormToPerson.phone}
      onChange={changeHandler}
      />
      </div>

      <div className="mb-3">
      <input 
      name="email"
      className="form-control"
      type="email"
      placeholder="Электронная почта" 
      value={inputFormToPerson.email}
      onChange={changeHandler}
      />
      </div>

      <button type="submit" className="btn btn-primary">
      Добавить
    </button>
    </form>

    {recipient &&
    <> 
      <h2>Отличная новость. Твой друг уже зарегистрирован. Список его желаний доступен на его страничке</h2>
      <h3>ссылка на пользователя {recipient.name}</h3>
    </>
    }

    {forms && 
    <>
      <h2>Хорошая новость! Пользователь уже заполнял анкету.</h2>
      <ul>
        {forms.map(e=> <li>f{e.id}</li>)}
      </ul>
    </>
    }
    {message && 
      <h2>{message}</h2>
    }
    </div>
  
  )
}
