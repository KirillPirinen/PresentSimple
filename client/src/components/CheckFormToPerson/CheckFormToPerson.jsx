import { useDispatch } from "react-redux";
import { useState } from "react";
import { checkForm } from "../../redux/actions/checkFormToPerson";
import { useHistory } from "react-router";

export default function CheckFormToPerson() {

  const [inputFormToPerson, setInputFormToPerson] = useState({name: '', lname: '', phone: '', email: ''});

  const dispatch = useDispatch();
  const history = useHistory();

  const changeHandler = (e) => {
    setInputFormToPerson((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const checkFormHandler = (e) => {
    e.preventDefault();
    if (inputFormToPerson) {
      dispatch(checkForm(inputFormToPerson.name, inputFormToPerson.lname, inputFormToPerson.phone, inputFormToPerson.email, history))
      setInputFormToPerson("");
    }
  };

  return(
    <div>
    <h2>Введите данные того человека, кому хотите подарить подарок</h2>
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
    </div>
  )
}
