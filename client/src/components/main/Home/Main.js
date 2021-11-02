import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Button } from "reactstrap";
import { clearCheckForm } from "../../../redux/actions/checkFormToPerson";

export const Main = ({ setShowForm, user }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const clickHandler = () => {
    dispatch(clearCheckForm());
    history.push("/search");
  };
  return (
    <div className="container">
      <h1>Добро пожаловать на сайт подарков Present Simple!</h1>
      <div>
        <h2>Хотите составить список своих желаний подарков?</h2>
        <Button
          onClick={() =>
            user ? history.push("/mywishlist") : history.push("/auth/signup")
          }
        >
          Очень хочу!!!
        </Button>
      </div>
      <div>
        <h2>Выбираете подарок и не знаете, что подарить?</h2>
        <Button
          onClick={() =>
            !user ? history.push("/auth/signup") : clickHandler()
          }
        >
          Да
        </Button>
      </div>
    </div>
  );
};
