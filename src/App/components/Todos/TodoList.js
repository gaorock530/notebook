import React, {Component} from 'react';
import { connect } from 'react-redux';
import './TodoList.scss';

import * as actions from '../../actions';


class TodoList extends Component {

  handleInputChange = (id, _id) => {
    this.props.toggleComplete(id, _id);
    if (!this.props.edit.onChange) this.props.toggleOnChange();
  }

  

  renderEdit = (onEdit, id, obj) => {
    const handleClick  = (e) => {
      this.porps.toggleOnChange(true);
    }


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
          <a onClick={() => {this.props.enterList(todo.id, todo.title)}}>{todo.title}</a> 
          {this.renderEdit(onEdit, todo.id)}
        </div>
      )
    })
  }

  renderTodo = () => {
    const {todos, edit} = this.props;
    const { onEdit } = edit;
    const todo = todos.filter((todo)=> todo.id === this.props.todoState.listID);
    if (todo.lenght < 1) return '';

    return todo[0].todos.map((item) => {
      return (
        <div className="checkbox noselect" key={item._id}>
          <label>
            <input type="checkbox" id="blankCheckbox"
            checked={item.complete}
            onChange={this.handleInputChange.bind(this, todo[0].id, item._id)}/>
            {item.text} 
          </label>
          {this.renderEdit(onEdit, item._id)}
        </div>     
      )
    })
  }

  render () {
    return (
      <div className="text-left list-font">
        {this.props.todoState.listID ? this.renderTodo() : this.renderList()}
      </div>
    )
  }
}

export default connect(state => state, actions)(TodoList);