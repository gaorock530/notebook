import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import './Login.scss';

class Register extends Component {
  componentDidMount () {
    document.title = 'Register';
  }
  

  render () {
    const onSubmit = async (e) => {
      e.preventDefault();

      const username = this.refs.username.value;
      const email = this.refs.email.value;
      const pass = this.refs.pass.value;
      const repass = this.refs.repass.value;

      if (!username) this.refs.username.focus();

      else if (!email) this.refs.email.focus();

      else if (!pass) this.refs.pass.focus();

      else if (pass !== repass) {
        this.refs.pass.value = '';
        this.refs.repass.value = '';
        this.refs.pass.focus();
      }

      else {
        try {
          const res = await this.props.register(username, pass, email);
          if (!res) return console.log('try again');
          
        }catch(e) {
          return false;
        }
      }
      
    }
    
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { isLogin } = this.props;
    
    if (isLogin) {
      return <Redirect to={from} />;
    }

    return (
      <div className="form">
        <form className="form-horizontal" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-4 control-label">Username :</label>
            <div className="col-sm-6">
              <input type="text" className="form-control" ref="username" placeholder="Username" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputEmail3" className="col-sm-4 control-label">Email :</label>
            <div className="col-sm-6">
              <input type="email" className="form-control" ref="email" placeholder="Email" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Password :</label>
            <div className="col-sm-6">
              <input type="password" className="form-control" ref="pass" placeholder="Password" />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword3" className="col-sm-4 control-label">Re-Password :</label>
            <div className="col-sm-6">
              <input type="password" className="form-control" ref="repass" placeholder="Re-Password" />
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
              <button type="submit" ref="register" className="btn btn-default">Register</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default connect(state => state, actions)(Register);