import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import validator from "validator";
import ModalInfo from '../../../ModalInfo/ModalInfo';
import { getError } from "../../../../redux/actions/error.ac";
import { resetPasswordAction } from "../../../../redux/actions/user.ac";
import {useParams} from "react-router";

const ResetPassword = () => {

  const [resetPassword, setResetPassword] = useState({
    password: "",
    password2: "",
  });

  let history = useHistory();
  const { reset_password_id } = useParams();

  const changeHandler = (e) => {
    setResetPassword((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (resetPassword.password !== resetPassword.password2) {
      dispatch(
        dispatch(getError("Вы не правильно ввели повторно пароль, попробуйте еще раз"))
      );
      // } else if(!validator.isStrongPassword(userSignUp.password, {minSymbols: 0})) {
      //  dispatch(getError("Пароль должен содержать не менее 8-ми символов, в том числе цифры, прописные и строчные буквы"))
    } else {
      dispatch(resetPasswordAction(resetPassword, history, reset_password_id));
      setResetPassword({
        password: "",
        password2: "",
      })
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={submitHandler}
        className="container-glass d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
      >
        <legend className="text-center mb-4">Восстановление пароля</legend>

        <div className="mb-3">
          <input
            onChange={changeHandler}
            className="form-control"
            value={resetPassword.password}
            type="password"
            name="password"
            placeholder="Пароль"
          />
        </div>

        <div className="mb-3">
          <input
            onChange={changeHandler}
            className="form-control"
            value={resetPassword.password2}
            type="password"
            name="password2"
            placeholder="Повторите пароль"
          />
        </div>

        <button type="submit" className="btn">
          Восстановить
        </button>
      </form>
      
      <ModalInfo />
    </div>
  );
};

export default ResetPassword;
