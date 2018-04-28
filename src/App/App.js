import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import WorkSpace from './components/WorkSpace';
import './App.scss';
import { connect } from 'react-redux';
import Header from './components/Header';
import Nav from './components/Nav';
import Login from './components/Login';
import Register from './components/Register';
import NotFound from './components/NotFound';
import PrivateRoute from './routers/PrivateRoute';

import * as actions from './actions';

class App extends Component {
  componentWillMount () {
    const token = localStorage.getItem('token');
    // if (!token || token === '') {
    //   console.log('no token');
    //   throw Error('no token')
    // };
    this.props.loadTodos(token);
  }
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Nav />
            <Header />
            <Switch>
              <PrivateRoute exact path='/' component={WorkSpace} />
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
