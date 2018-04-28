import React, { Component } from 'react';
import MenuBar from './MenuBar';
import TodoList from './TodoList';
import './WorkSpace.scss';

class WorkSpace extends Component {
  state = {
    title: ['walk', 'feed', 'watch', '写代码']
  }

  render () {
    return (
      <div className='workspace container-fluid'>
        <MenuBar />
        <TodoList list={this.state.title}/>
      </div>
    )
  }
}

export default WorkSpace;