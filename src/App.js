
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from "./components/main/NavBar/NavBar";
import Home from "./components/main/Home/Home";
import Registration from "./components/main/Registration/Registration";
import Authorization from "./components/main/Authorization/Authorization";
import SentList from "./components/presents/SentList/SentList";
import PersonalProfile from "./components/PersonalProfile/PersonalProfile"
import { SentForm } from "./components/SentForm/SentForm";
import { FormContextProvider } from "./components/context/SentFormContext";

function App() {
  return (
    <Router>
      <NavBar />
      <Route exact path="/" component={Home} />
      <Route exact path="/registration" component={Registration} />
      <Route exact path="/authorization" component={Authorization} />
      <Route exact path="/sentList" component={SentList} />
      <FormContextProvider>
        <Route exact path="/sentform">
            <SentForm/>
        </Route>
       </FormContextProvider>
      <Route exact path="/lk" component={PersonalProfile} />
    </Router>
  );
}

export default App;
