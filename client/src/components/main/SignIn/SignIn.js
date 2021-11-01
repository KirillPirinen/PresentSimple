import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { signIn } from "../../../redux/actions/user.ac";
import { clearErrorAuth } from "../../../redux/actions/errorAuth.ac";

const SignIn = () => {
  const errorAuth = useSelector((state) => state.errorAuth);

  const [userSignIn, setUserSignIn] = useState({
    email: "",
    password: "",
    phone: "",
  });

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  const changeHandler = (e) => {
    setUserSignIn((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

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
    <div className="d-flex justify-content-center">
      {errorAuth ? (
        <>
          <h2>{errorAuth}</h2>
          <form
            onSubmit={submitHandler}
            className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
          >
            <legend className="text-center mb-4">Вход</legend>
            <div className="mb-3">
              <input
                onChange={changeHandler}
                value={userSignIn.email}
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                value={userSignIn.phone}
                className="form-control"
                type="text"
                name="phone"
                placeholder="Телефон"
              />
            </div>

            <div className="mb-3">
              <input
                onChange={changeHandler}
                value={userSignIn.password}
                className="form-control"
                type="password"
                name="password"
                placeholder="Пароль"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Войти
            </button>
          </form>
        </>
      ) : (
        <form
          onSubmit={submitHandler}
          className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
        >
          <legend className="text-center mb-4">Вход</legend>
          <div className="mb-3">
            <input
              onChange={changeHandler}
              value={userSignIn.email}
              className="form-control"
              type="email"
              name="email"
              placeholder="Email"
            />
          </div>

          <div className="mb-3">
            <input
              onChange={changeHandler}
              value={userSignIn.password}
              className="form-control"
              type="password"
              name="password"
              placeholder="Пароль"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Войти
          </button>
        </form>
      )}
    </div>
  );
};

export default SignIn;
