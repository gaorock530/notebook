import React, {Component} from 'react';
import { connect } from 'react-redux';
import './MenuBar.scss';
import * as actions from '../../actions';
import TodoStatus from './TodoStatus';

class MenuBar extends Component {
  componentDidMount() {
    
  } 

  getOptValue = () => {
    console.log(this.refs.opt.value);
  }
 
  render () {
    let empty = this.props.todos.length === 0; 

    const handleAdd = () => {
      this.props.toggleOnChange(true);
      this.props.toggleAdding(true);
    }

    const handleEdit = () => {
      if (this.props.todos.length === 0) return;
      this.props.toggleEdit();
    }
  
    const handleSave = async () => {
      // Only click 'save' button, will save data to the SERVER, otherwise just save to localStorage
      if (!this.props.edit.onChange) return;
      try {
        const id = this.props.todoState.listID;
        const title = this.props.todoState.listTitle;
        const list = this.props.todos.filter( (list) => list.id === id);
        // return console.log(id, title, list[0].todos);
        const res = this.props.saveTodos(id, title, list[0].todos); 
        if (!res) return console.log(res);;
      }catch(e){
        return;
      }
      this.props.toggleOnChange(false);
      if (this.props.edit.onEdit) this.props.toggleEdit();
      
    }

    const keyPress = (e) => {
      switch (e.keyCode) {
        case 13:
          if (this.refs.todo.value !== '') {
            this.props.addTodo(this.refs.todo.value.trim());
            this.refs.todo.value = ''
          }
          // this.props.toggleAdding(true);
          break;

        case 27:
          this.props.toggleAdding(false);
          break;
        default:
          return;
      }
    }

    const onBlur = () => {
      this.props.toggleAdding(false);
    }

    return (
      <div className="">
        <div className='menu_style row'>
          <div className='text-left col-xs-12 col-sm-6 col-md-6 col-lg-6 menu-message'>
            <span onClick={()=> {this.props.quitList()}}>List</span>
            <TodoStatus />
          </div>
          <div className='text-right col-xs-12 col-sm-6 col-md-6 col-lg-6'>
            {this.props.edit.isAdding ? (
                <input type="text" className="input-add" ref="todo" placeholder="Press Enter to Add todo ..." autoFocus 
                  onKeyDown={keyPress}
                  onBlur={onBlur}
                />
              ): ''}
            <button className={'menu-button v-space' + (this.props.edit.isAdding ? ' button-on-edit' : '')} onClick={handleAdd}>New Todo</button>
            <button className={'menu-button v-space' + (empty ? ' button-disable' : this.props.edit.onEdit ? ' button-on-edit' : '')} 
                    onClick={handleEdit}>Edit</button>
            <button className={'menu-button v-space' + (this.props.edit.onChange ? '': ' button-disable')} 
                    onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state, actions)(MenuBar);