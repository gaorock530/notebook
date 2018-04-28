import React, {Component} from 'react';
import { connect } from 'react-redux';
import './TodoList.scss';

import * as actions from '../actions';


class TodoList extends Component {
  handleInputChange(id) {
    this.props.toggleComplete(id);
    if (!this.props.onChange) this.props.toggleOnChange();
  }

  

  renderEdit (showEdit, id, obj) {
    const handleClick  = (e) => {
      if (obj.todos.length === 1) obj.toggleEdit(false);
      obj.delTodo(id);
      obj.toggleOnChange(true);
    }

    return showEdit ? (
      <span className="edit-group">
        <button className="edit-button edit-button-add" onClick={handleClick}>+</button>
        <button className="edit-button edit-button-del" onClick={handleClick}>-</button>
      </span>
    ) : ''
  }
  
  renderList() {
    const {todos, showEdit} = this.props;
    return todos.map((todo) => {
      return (
        <div className="checkbox" key={todo.id}>
          <label>
            <input type="checkbox" id="blankCheckbox" value="option1"
            checked={todo.complete}
            onChange={this.handleInputChange.bind(this, todo.id)}/>
            {todo.text} 
          </label>
          {this.renderEdit(showEdit, todo.id, this.props)}
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