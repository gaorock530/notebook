import React, {Component} from 'react';
import { connect } from 'react-redux';
import './TodoList.scss';

import * as actions from '../../actions';

/**
 * @see {IMPORTANT}
 * @deprecated just a temp file for backup Todolist.js
 * @see {IMPORTANT}
 */


class TodoList extends Component {
  handleInputChange = (id) => {
    this.props.toggleComplete(id);
    if (!this.props.edit.onChange) this.props.toggleOnChange();
  }

  renderEdit = (onEdit, id, obj) => {
    const handleClick  = (e) => {
      // if (obj.todos.length === 1) obj.toggleEdit(false);
      // obj.delTodo(id);
      this.porps.toggleOnChange(true);
    }
    console.log(id);

    return onEdit ? (
      <span className="edit-group">
        <a className="edit-button edit-button-add" onClick={handleClick}><i className="fa fa-plus"></i></a>
        <a className="edit-button edit-button-del" onClick={handleClick}><i className="fa fa-minus"></i></a>
      </span>
    ) : ''
  }
  
  renderList = () => {
    const {todos, edit} = this.props;
    const { onEdit } = edit;
    return todos.map((todo) => {
      return (
        <div className="checkbox noselect" key={todo.id}>
          <label>
            <input type="checkbox" id="blankCheckbox"
            checked={todo.complete}
            onChange={this.handleInputChange.bind(this, todo.id)}/>
            {todo.title} 
          </label>
          {this.renderEdit(onEdit, todo.id)}
        </div>     
      )
    })
  }

  render () {
    return (
      <div className="text-left list-font">
        {this.renderList()}
      </div>
    )
  }
}

export default connect(state => state, actions)(TodoList);