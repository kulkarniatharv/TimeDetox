import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/dashboard/Home';

function App() {
  return (
    <Router>
      <Switch>
        <ProtectedRoute exact path="/" component={Home} />

        <Route exact path="/" component={Home} />

        <Route exact path="/signin">
          <Login mode={1} />
        </Route>

        <Route exact path="/signup">
          <Login mode={0} />
        </Route>

        <Route path="*" component={() => '404 NOT FOUND'} />
      </Switch>
    </Router>
  );
}

export default App;
