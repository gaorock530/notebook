import React, {Component} from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import './Nav.scss';

import * as actions from '../../actions';

class Nav extends Component {
  componentDidMount () {
    // console.log(this.props)
  }

  addTodoList = () => {
    console.log('new list');
  }
  
  render () {
    const logout = () => {
      if (window.localStorage){
        const token = localStorage.getItem('token');
        if (!token) throw Error('no Token in LocalStorage');
        this.props.logout(token);
      } else {
        console.log('you cannot logout, because your browser dosen\'t support localStorage');
      }
      
    }

    return (
      <nav className='row'>
        <div className='nav-left col-xs-12 col-sm-6'>
          <NavLink exact to="/" className="nav-item nav-home" activeClassName="active">Schedule</NavLink>
          <NavLink strict to="/todo" className="nav-item nav-home" activeClassName="active">Todo List</NavLink>
          <NavLink strict to="/finance" className="nav-item nav-home" activeClassName="active">Finance</NavLink>
        </div>
        <div className='nav-right col-xs-12 col-sm-6'>
          {!this.props.user.isLogin ? (
            <div>
              <Link to="/login" className="nav-item">Login</Link>
              <span>or</span>
              <Link to="/register" className="nav-item">Register</Link>
            </div>
          ) : (
            <span>
              Hi, {this.props.user.username}
              <a className="nav-item" onClick={logout} title="Log out"><i className="fa fa-sign-in" alt="Log out"></i></a>
            </span>
          )}
        </div>
      </nav>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
}

// withRouter will solve 'page change but <NavLink>.activeClass will not change'
export default withRouter(connect(mapStateToProps, actions)(Nav));