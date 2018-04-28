import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import './Login.scss';
import * as actions from '../actions';

class Login extends Component {
  

  render () {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { isLogin } = this.props;

    if (isLogin) {
      return <Redirect to={from} />;
    }

    const handleSubmit = async (e) => {
      e.preventDefault();
      const username = this.refs.username.value.trim();
      const password = this.refs.password.value.trim();
      const res = await this.props.login(username, password);
      if (!res) {
        this.refs.username.value = '';
        this.refs.password.value = '';
      }
      // this.props.loadTodos(res.data.todos);
    }
    
    

    return (
      <div className="form" onSubmit={handleSubmit}>
        <form className="form-horizontal">
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-4 control-label">Username :</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" ref='username' placeholder="Username/Email" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Password :</label>
            <div className="col-sm-6">
              <input type="password" className="form-control" ref="password" placeholder="Password" />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <div className="checkbox">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <button type="submit" className="btn btn-default">Login</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(state=>state, actions)(Login)