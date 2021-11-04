import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/main/NavBar/NavBar";
import Home from "./components/main/Home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth, deleteUser } from "./redux/actions/user.ac";
import PrivateRoute from "./components/main/PrivateRouter/PrivateRouter";
import SignUp from "./components/main/SignUp/SignUp";
import SignIn from "./components/main/SignIn/SignIn";
import SignOut from "./components/main/SignOut/SignOut";
import { SentForm } from "./components/SentForm/SentForm";
import { FormContextProvider } from "./components/context/SentFormContext";
import SentList from "./components/presents/SentList/SentList";
import WishList from "./components/WishList/WishList";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";
import { SentFormCheker } from "./components/SentForm/SentFormChecker";
import "./index.css";
import WishListPerson from "./components/WishList/WishListPerson/WishListPerson";
import ModalGroup from "./components/WishList/ModalGroup/ModalGroup";
import CheckFormToPerson from "./components/CheckFormToPerson/CheckFormToPerson";
// import WishList from "./components/WishList/WishList";
import { SuccessAdded } from "./components/SuccessAdded/SuccessAdded";
import { clearCheckForm } from "./redux/actions/checkFormToPerson";
import { FormRoot } from "./components/FormRoot/FormRoot";
import moment from "moment";
import "moment/locale/ru";
import ModalInfo from "./components/ModalInfo/ModalInfo";
import ModalForgotPassword from "./components/main/SignIn/modalForgotPassword/modalForgotPassword";
import ResetPassword from "./components/main/SignIn/ResetPassword/ResetPassword";
import ModalContact from "./components/main/Home/ModalContact/ModalContact";
moment.locale("ru");

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
    // dispatch(deleteUser())
  }, []);

  // useEffect(() => {
  //   dispatch(clearErrorAuth());
  // }, []);

  return (
    <>
      <Router>
        <NavBar />
        <Route exact path="/" component={Home} />
        <Route exact path="/auth/signup" component={SignUp} />
        <Route exact path="/auth/signin" component={SignIn} />
        <Route exact path="/auth/signout" component={SignOut} />
        <PrivateRoute path="/sentList">
          <SentList />
        </PrivateRoute>
        <PrivateRoute exact path="/presents/:uuid">
          <FormRoot />
        </PrivateRoute>
        <PrivateRoute exact path="/search">
          <CheckFormToPerson />
        </PrivateRoute>
        <FormContextProvider>
          <Route exact path="/sentform/:uuid">
            <SentFormCheker />
          </Route>
        </FormContextProvider>
        <Route exact path="/lk" component={PersonalProfile} />
        <Route
          exact
          path="/wishListPerson/:user_id"
          component={WishListPerson}
        />
        <Route
          exact
          path="/modalGroup/:wish_id/:user_id"
          component={ModalGroup}
        />
        <Route exact path="/mywishlist" component={WishList} />
        <Route exact path="/success" component={SuccessAdded} />
        <Route
          exact
          path="/modal/forgotPassword"
          component={ModalForgotPassword}
        />
        <Route
          exact
          path="/resetPassword/fhjdbjhvhbavjdfhbakn/:reset_password_id"
          component={ResetPassword}
        />
                <Route
          exact
          path="/modalContact"
          component={ModalContact}
        />
      </Router>
    </>
  );
}

export default App;
