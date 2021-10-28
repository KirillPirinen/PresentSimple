import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import PersonalProfile from "./components/PersonalProfile/PersonalProfile"

function App() {
  return (
    <Router>
    <div className="App">
      <PersonalProfile />
    </div>
    </Router>
  );
}

export default App;
