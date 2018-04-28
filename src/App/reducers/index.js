import { combineReducers } from 'redux';
// import { reducer as reduxForm } from 'redux-form';
import todoReducer from './todoReducer';
import showEdit from './showEditReducer';
import onChange from './onChangeReducer';
import isLogin from './authReducer';
import isAdding from './addingReducer';
import username from './usernameReducer';


export default combineReducers({
  todos: todoReducer,
  showEdit,
  onChange,
  isLogin,
  isAdding,
  username
});