import React, {Component} from 'react';
import { connect } from 'react-redux';
import './MenuBar.scss';
import * as actions from '../actions';

class MenuBar extends Component {
  componentDidMount() {
    
  }
  //indicate Add event
  adding = false;  

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
      if (!this.props.onChange) return;
      try {
        const res = this.props.saveTodos(this.props.todos);
        if (!res) return ;
      }catch(e){
        return;
      }
      this.props.toggleOnChange(false);
      if (this.props.showEdit) this.props.toggleEdit();
      
    }

    const keyPress = (e) => {
      switch (e.keyCode) {
        case 27:
          this.props.toggleAdding(false);
          break;
        case 13:
          if (this.refs.todo.value !== '') {
            this.props.addTodo(this.refs.todo.value.trim());
            this.refs.todo.value = ''
          }
          break;
        default:
          return;
      }
    }

    return (
      <div className="container-fluid">
        <div className='menu_style row'>
          <div className='menu-message text-left col-xs-12 col-sm-6 col-md-6 col-lg-6 v-space'>
            {this.props.isAdding? (
              <input type="text" className="input-add" ref="todo" placeholder="Add todo ..." autoFocus onKeyDown={keyPress}/>
            ): ''}
          </div>
          <div className='text-right col-xs-12 col-sm-6 col-md-6 col-lg-6'>
            <button className={'menu-button v-space' + (this.props.isAdding ? ' button-on-edit' : '')} onClick={handleAdd}>Add</button>
            <button className={'menu-button v-space' + (empty ? ' button-disable' : this.props.showEdit ? ' button-on-edit' : '')} 
                    onClick={handleEdit}>Edit</button>
            <button className={'menu-button v-space' + (this.props.onChange ? '': ' button-disable')} 
                    onClick={handleSave}>Save</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(state => state, actions)(MenuBar);