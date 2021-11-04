import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/main/NavBar/NavBar";
import Home from "./components/main/Home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth, deleteUser } from "./redux/actions/user.ac";
import PrivateRoute from "./components/main/PrivateRouter/PrivateRouter";
import SignUp from "./components/main/SignUp/SignUp";
import SignIn from "./components/main/SignIn/SignIn";
import SignOut from "./components/main/SignOut/SignOut";
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
import { NotFound } from "./components/404";
moment.locale("ru");

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkAuth());
    // dispatch(deleteUser())
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(clearErrorAuth());
  // }, []);

  return (
      <BrowserRouter>
      <NavBar />
         <Switch>
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
        <PrivateRoute exact path="/wishListPerson/:user_id">
          <WishListPerson/>
        </PrivateRoute>
          <Route exact path="/sentform/:uuid">
            <FormContextProvider>
            <SentFormCheker />
            </FormContextProvider>
          </Route>
        <PrivateRoute exact path="/lk">
          <PersonalProfile/>
        </PrivateRoute>
        <PrivateRoute
          exact
          path="/modalGroup/:wish_id/:user_id"
        >
          <ModalGroup/>
        </PrivateRoute>
        <PrivateRoute exact path="/mywishlist">
        <WishList/>
        </PrivateRoute>
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
        <Route exact path="*" component={NotFound}/>
        </Switch>
      </BrowserRouter>
  );
}

export default App;
