import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import { Provider } from "react-redux";
import store from "./store";
import Main from "./pages/Main";
import UserDashboard from "./pages/UserDashboard";
import UserTicketMain from "./pages/UserTicketMain";
import UserTicketList from "./pages/UserTicketList";
import UserTicketDetail from "./pages/UserTicketDetail";
import UserContact from "./pages/UserContact";
import AdminDashboard from "./pages/AdminDashboard";
import AdminTicketMain from "./pages/AdminTicketMain";
import AdminTicketList from "./pages/AdminTicketList";
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
          <UserRoute exact path="/user/dashboard" component={UserDashboard} />
          <UserRoute exact path="/user/ticketrequest" component={UserTicketMain} />
          <UserRoute exact path="/user/ticketlist" component={UserTicketList} />
          <UserRoute exact path="/user/ticketdetails" component={UserTicketDetail} />
          <UserRoute exact path="/user/contact" component={UserContact} />
          <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />
          <AdminRoute exact path="/admin/ticketrequest" component={AdminTicketMain} />
          <AdminRoute exact path="/admin/ticketlist" component={AdminTicketList} />
          {/* <UserRoute exact path="/user/ticketdetails" component={UserTicketDetail} />
          <UserRoute exact path="/user/contact" component={UserContact} /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
