import React, { Component } from 'react';
import {connect} from 'react-redux';
import MenuBar from './MenuBar';
import TodoList from './TodoList';
import '../Home/WorkSpace.scss';
import * as actions from '../../actions';

class WorkSpace extends Component {
  componentWillMount() {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      console.log('no token');
      throw Error('no token')
    };
    
    this.props.loadingWholeList(token);
  }
  componentDidMount () {
    document.title = 'Schedule';
  }

  render () {
    return (
      <div className='workspace container-fluid'>
        <MenuBar />
        <TodoList />
      </div>
    )
  }
}

export default connect(null, actions)(WorkSpace);