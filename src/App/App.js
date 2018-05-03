import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.scss';
import { connect } from 'react-redux';
import Header from './components/Common/Header';
import Nav from './components/Common/Nav';
import Login from './components/Common/Login';
import Register from './components/Common/Register';
import NotFound from './components/Common/NotFound';
import PrivateRoute from './routers/PrivateRoute';
import WorkSpace from './components/Home/WorkSpace';
import Todos from './components/Todos/Todos';
import Finance from './components/Finance/Finance';

import * as actions from './actions';

class App extends Component {
  componentWillMount () {
    this.props.verifyAuth();
  }
  
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Nav />
            <Header />
            <Switch>
              <Route exact path='/' component={WorkSpace} />
              <PrivateRoute strict path='/todo' component={Todos} />
              <PrivateRoute strict path='/finance' component={Finance} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(null, actions)(App);
