import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.scss';

import * as actions from '../actions';

class Nav extends Component {
  componentDidUpdate () {
    // console.log(this.props)
  }

  

  render () {
    const logout = () => {
      if (window.localStorage){
        const token = localStorage.getItem('token');
        this.props.logout(token);
      } else {
        console.log('you cannot logout, because your browser dosen\'t support localStorage');
      }
      
    }

    return (
      <nav className='nav-container'>
        <div className='nav-left col-xs-6'>
          <Link to="/" className="nav-item nav-home">Schedule</Link>
        </div>
        <div className='nav-right col-xs-6'>
          {!this.props.isLogin ? (
            <div>
              <Link to="/login" className="nav-item">Login</Link>
              <span>or</span>
              <Link to="/register" className="nav-item">Register</Link>
            </div>
          ) : (
            <span>
              Hi, {this.props.username}
              <a className="nav-item" onClick={logout}>Log out</a>
            </span>
          )}
        </div>
      </nav>
    )
  }
}

export default connect(state => state, actions)(Nav);