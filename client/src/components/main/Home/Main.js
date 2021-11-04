import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { clearCheckForm } from "../../../redux/actions/checkFormToPerson";
import image from "../../../pngegg.png";

export const Main = ({ setShowForm, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(clearCheckForm());
    history.push("/search");
  };
  return (
    <div className="container d-flex justify-content-center flex-column">
      <h3>Добро пожаловать на сервис подбора подарков Present Simple!</h3>
      <hr />
      <div className="d-flex justify-content-center flex-wrap">
        <div className="m-3 d-flex flex-column container-glass-light">
          <h6>Хотите составить список своих желаний подарков?</h6>
          <br />
          <button
            onClick={() =>
              user ? history.push("/mywishlist") : history.push("/auth/signup")
            }
          >
            Очень хочу!!!
          </button>
        </div>
        <br />
        <div className="m-3 d-flex flex-column container-glass-light">
          <h6>Выбираете подарок и не знаете, что подарить?</h6>
          <br />
          <button
            onClick={() =>
              !user ? history.push("/auth/signup") : clickHandler()
            }
          >
            Да
          </button>
        </div>
        <div className="m-3 d-flex flex-column container-glass-light">
          <h6>
            Вам прислали анкету или вы просто хотите узнать как это работает?
          </h6>
          <br />
          <button
            onClick={() =>
              !user ? history.push("/auth/signup") : clickHandler()
            }
          >
            Да
          </button>
        </div>
        <div className="m-3 d-flex flex-column container-glass-light">
          <h6>Cвязаться с нами</h6>
          <br />
          <button onClick={() => history.push(`/modalContact`)}>
            К контактам
          </button>
        </div>
        <div className="m-3 d-flex flex-column container-glass-light container-in-progress">
          <h6>Предсказать подарок по интересам</h6>
          <br />
          <button disabled="disabled"></button>
          <img src={image} />
        </div>
        <div className="m-3 d-flex flex-column container-glass-light container-in-progress">
          <h6>Статистика самых востребованых подарков</h6>
          <br />
          <button disabled="disabled"></button>
          <img src={image} />
        </div>
      </div>
    </div>
  );
};
