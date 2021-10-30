import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { signUp } from "../../../redux/actions/user.ac";
import validator from "validator";
import { getError, clearError } from "../../../redux/actions/error.ac";

const SignUp = () => {
  const error = useSelector((state) => state.error);

  const [userSignUp, setUserSignUp] = useState({
    name: "",
    lname: "",
    email: "",
    phone: "",
    password: "",
    password2: "",
  });

  let history = useHistory();

  const changeHandler = (e) => {
    setUserSignUp((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (!validator.isEmail(userSignUp.email)) {
      dispatch(getError("Некорректный адрес электронной почты"));
    } else if (!validator.isMobilePhone(userSignUp.phone)) {
      dispatch(getError("Некорректный номер телефона"));
    } else if (userSignUp.password !== userSignUp.password2) {
      dispatch(
        getError("Вы не правильно ввели повторно пароль, попробуйте еще раз")
      );
      // } else if(!validator.isStrongPassword(userSignUp.password, {minSymbols: 0})) {
      //  dispatch(getError("Пароль должен содержать не менее 8-ми символов, в том числе цифры, прописные и строчные буквы"))
    } else {
      dispatch(clearError());
      let payload = Object.entries(userSignUp).filter((el) =>
        el[1] ? el[1].trim() : el[1]
      );
      if (payload.length) {
        payload = Object.fromEntries(payload);
        dispatch(signUp(payload, history));
      }
    }
  };

  return (
    <div className="d-flex justify-content-center">
      {error ? (
        <>
          <h2>{error}</h2>
          <form
            onSubmit={submitHandler}
            className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
          >
            <legend className="text-center mb-4">Регистрация</legend>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                className="form-control"
                value={userSignUp.name}
                type="text"
                name="name"
                placeholder="Имя"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                className="form-control"
                value={userSignUp.lname}
                type="text"
                name="lname"
                placeholder="Фамилия"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                className="form-control"
                value={userSignUp.email}
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                className="form-control"
                value={userSignUp.phone}
                type="phone"
                name="phone"
                placeholder="Телефон"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                className="form-control"
                value={userSignUp.password}
                type="password"
                name="password"
                placeholder="Пароль"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                className="form-control"
                value={userSignUp.password2}
                type="password"
                name="password2"
                placeholder="Повторите пароль"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Зарегистрироваться
            </button>
          </form>
        </>
      ) : (
        <form
          onSubmit={submitHandler}
          className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
        >
          <legend className="text-center mb-4">Регистрация</legend>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              className="form-control"
              value={userSignUp.name}
              type="text"
              name="name"
              placeholder="Имя"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              className="form-control"
              value={userSignUp.lname}
              type="text"
              name="lname"
              placeholder="Фамилия"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              className="form-control"
              value={userSignUp.email}
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              className="form-control"
              value={userSignUp.phone}
              type="phone"
              name="phone"
              placeholder="Телефон"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              className="form-control"
              value={userSignUp.password}
              type="password"
              name="password"
              placeholder="Пароль"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              className="form-control"
              value={userSignUp.password2}
              type="password"
              name="password2"
              placeholder="Повторите пароль"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Зарегистрироваться
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUp;
