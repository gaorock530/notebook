import { combineReducers } from 'redux';
// import { reducer as reduxForm } from 'redux-form';
import todoReducer from './todoReducer';
import todoStateReducer from './todoStateReducer';
import edit from './editStateReducer';
import user from './authReducer';



export default combineReducers({
  todos: todoReducer,
  todoState: todoStateReducer,
  user,
  edit
});