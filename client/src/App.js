import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/main/NavBar/NavBar";
import Home from "./components/main/Home/Home";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/user.ac";
import PrivateRoute from "./components/main/PrivateRouter/PrivateRouter";
import SignUp from "./components/main/SignUp/SignUp";
import SignIn from "./components/main/SignIn/SignIn";
import SignOut from "./components/main/SignOut/SignOut";
import { SentForm } from "./components/SentForm/SentForm";
import { FormContextProvider } from "./components/context/SentFormContext";
import SentList from "./components/presents/SentList/SentList";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";
import { clearError } from "./redux/actions/error.ac";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  useEffect(() => {
    dispatch(clearError());
  }, []);

  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/auth/signup" component={SignUp} />
      <Route exact path="/auth/signin" component={SignIn} />
      <Route exact path="/auth/signout" component={SignOut} />
      <PrivateRoute path="/sentList">
        <SentList />
      </PrivateRoute>
      <FormContextProvider>
        <Route exact path="/sentform">
          <SentForm />
        </Route>
      </FormContextProvider>
      <Route exact path="/lk" component={PersonalProfile} />
    </Router>
  );
}

export default App;
