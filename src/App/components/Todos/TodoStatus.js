import React, {Component} from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

class TodoStatus extends Component {

  changeTitle = () => {
    if (!this.refs.title) return;
    const title = this.refs.title.value.trim();
    if (this.props.todoState.listTitle === title) return this.props.toggleEditTitle(false, this.props.todoState.listID, this.props.todoState.listTitle);;
    if (!title) return;
    this.props.toggleOnChange(true);
    this.props.toggleEditTitle(false, this.props.todoState.listID , title);  
  }

  quitEdit = (e) => {
    if (e.keyCode === 27 || e.keyCode === 13) {
      this.changeTitle();
    }
  }

  handleFocus = (event) => {
    event.target.select();
    event.target.addEventListener('blur', this.changeTitle,{capture: false, once: true});
    event.target.addEventListener('keydown', this.quitEdit,{capture: false});
  }

  editTitle = () => {
    this.props.toggleEditTitle(true, this.props.todoState.listID, this.props.todoState.listTitle);
  }

  renderTitle = () => {
    if (!this.props.edit.isEditTitle) {
      return <a onClick={this.editTitle}>{this.props.todoState.listTitle || ''}</a>
    }else {
      return <input type='text' ref='title' className="input-title-edit" defaultValue={this.props.todoState.listTitle} onFocus={this.handleFocus} autoFocus/>
    }
  }

  render () {
    return (
      <span>
        <span>{this.props.todoState.listTitle ? ' > ' : ''}</span>
        {this.renderTitle()}
      </span>
    )
  }
}

export default connect(state => state, actions)(TodoStatus);
