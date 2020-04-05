import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Provider } from "react-redux";
import store from "./store";
import Main from "./pages/Main";
import UserDashboard from "./pages/UserDashboard";
import UserTicketMain from "./pages/UserTicketMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    
    <Provider store={store}>
      <Router>

        <Route exact path="/" component={Main} />
        <Route exact path="/dashboard" component={UserDashboard} />
        <Route exact path="/usertix" component={UserTicketMain} />

      </Router>
    </Provider>
  );
}

export default App;
