import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/main/NavBar/NavBar";
import Home from "./components/main/Home/Home";
import SentList from "./components/presents/SentList/SentList";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/actions/user.ac";
import PrivateRoute from "./components/main/PrivateRouter/PrivateRouter";
import SignUp from "./components/main/SignUp/SignUp";
import SignIn from "./components/main/SignIn/SignIn";
import SignOut from "./components/main/SignOut/SignOut";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
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
    </Router>
  );
}

export default App;
