import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import ExpensDashbordPage from '../components/ExpenseDashbordPage';
import AddExpensePage from '../components/AddExpensePage';
import EditExpensePage from '../components/EditExpensePage';
import HelpPage from '../components/Help';
import NotFoundPage from '../components/not-found';
import LoginPage from '../components/LoginPage';
import Header from '../components/Header';
import PrivateRoute from './PrivateRoute';

export const history = createHistory();

const AppRouter = () => (
  //in the previous setup, we were using BroswerRoute from react-router-dom. In this new setup we need to use our own history declaration
  <Router history={history}>
    <div>
      <Switch>
        <Route path="/" component={LoginPage} exact={true} />
        <PrivateRoute path="/dashboard" component={ExpensDashbordPage} />
        <PrivateRoute path="/create" component={AddExpensePage} />
        <PrivateRoute path="/edit/:id" component={EditExpensePage} />
        <Route path="/help" component={HelpPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </div>
  </Router>
)

export default AppRouter;