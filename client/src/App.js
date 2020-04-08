import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "./components/PrivateRoute";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./pages/Main";
import UserDashboard from "./pages/UserDashboard";
import UserTicketMain from "./pages/UserTicketMain";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { loadUser } from "./actions/authAction";


function App() {

  useEffect(() => {
    store.dispatch(loadUser())
    // store.dispatch(loadUserTickets())
  })

  return (

    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Main} />
          <PrivateRoute exact path="/dashboard" component={UserDashboard} />
          <PrivateRoute exact path="/ticketrequest" component={UserTicketMain} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
