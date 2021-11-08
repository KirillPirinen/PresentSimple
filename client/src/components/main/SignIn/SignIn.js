import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import { signIn } from "../../../redux/actions/user.ac";
import ModalInfo from "../../ModalInfo/ModalInfo";

const SignIn = () => {
  const dispatch = useDispatch();

  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
  });

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    let payload = Object.entries(userSignIn).filter((el) =>
      el[1] ? el[1].trim() : el[1]
    );
    if (payload.length) {
      payload = Object.fromEntries(payload);
      dispatch(signIn(payload, history, from));
    }
  };

  return (
    <>
      <div style={{ width:'60%' }} className="d-flex justify-content-center py-5">
        <form
          onSubmit={submitHandler}
          className="w-100 d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3 container-glass"
        >
          <legend className="text-center mb-4">Вход</legend>
          <div className="mb-3" style={{ width:'60%' }}>
            <input
              onChange={changeHandler}
              value={userSignIn.email}
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="mb-3" style={{ width:'60%' }}>
            <input
              onChange={changeHandler}
              value={userSignIn.password}
              className="form-control"
              type="password"
              name="password"
              placeholder="Пароль"
            />
          </div>
          <button type="submit" className="btn">
            Войти
          </button>
          <br />
          <Link to="/auth/signup">
            Зарегистрироваться
          </Link>
          <br/>
          <Link to="/modal/forgotPassword">
            Забыл пароль
          </Link>
        </form>
      </div>
    </>
  );
};

export default SignIn;
