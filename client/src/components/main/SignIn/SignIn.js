import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";
import { infoModalActivate } from "../../../redux/actions/modalInfoAC";
import { signIn } from "../../../redux/actions/user.ac";
import { ErrorMessage } from "../../CheckFormToPerson/subComponents/ErrorMessage";
import ModalInfo from "../../ModalInfo/ModalInfo";

const SignIn = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  console.log(error)
  useEffect(() => {
    if(error) {
      dispatch(infoModalActivate())
    }
  },[error])
  
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
    <div className="d-flex justify-content-center">
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
    <ModalInfo>
    {error && 
      <ErrorMessage message={error}/>
    }
    </ModalInfo>
    </div>
    </>
  );
};

export default SignIn;

// {error ? (
//   <>
//     <div className="container-glass">{error}</div>
//     <form
//       onSubmit={submitHandler}
//       className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
//     >
//       <legend className="text-center mb-4">Вход</legend>
//       <div className="mb-3">
//         <input
//           onChange={changeHandler}
//           value={userSignIn.email}
//           className="form-control"
//           type="email"
//           name="email"
//           placeholder="Email"
//         />
//       </div>

//       <div className="mb-3">
//         <input
//           onChange={changeHandler}
//           value={userSignIn.password}
//           className="form-control"
//           type="password"
//           name="password"
//           placeholder="Пароль"
//         />
//       </div>

//       <button type="submit" className="btn btn-primary">
//         Войти
//       </button>
//     </form>
//   </>
// ) : (
//   <form
//     onSubmit={submitHandler}
//     className="d-flex flex-column align-items-center bg-light text-dark p-3 border rounded-3"
//   >
//     <legend className="text-center mb-4">Вход</legend>
//     <div className="mb-3">
//       <input
//         onChange={changeHandler}
//         value={userSignIn.email}
//         className="form-control"
//         type="email"
//         name="email"
//         placeholder="Email"
//       />
//     </div>

//     <div className="mb-3">
//       <input
//         onChange={changeHandler}
//         value={userSignIn.password}
//         className="form-control"
//         type="password"
//         name="password"
//         placeholder="Пароль"
//       />
//     </div>

//     <button type="submit" className="btn btn-primary">
//       Войти
//     </button>
//   </form>
// )}
