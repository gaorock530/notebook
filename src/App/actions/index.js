import axios from 'axios';
import {ADDR} from '../../config/config';
import {
  // todo
  ADD_TODO,
  DEL_TODO,
  LOAD_TODOS,
  // user act
  TOGGLE_COMPLETE,
  TOGGLE_EDIT,
  TOGGLE_ON_CHANGE,
  TOGGLE_ADDING,
  // authentication
  LOGIN,
  LOGOUT,
  SET_USERNAME
} from './types';

//
export const addTodo = (text) => dispatch => {
  dispatch({ type: ADD_TODO, text }); 
};

export const delTodo = id => dispatch => {
  dispatch({ type: DEL_TODO, id});
}

export const loadTodos = (token) => async dispatch => {
  try {
    const res = await axios({
      url: `${ADDR}/todo/load`,
      method: 'post',
      headers: {
        'token': token
      }
    });
    dispatch({type:LOAD_TODOS, todos: res.data.todos});
  }catch(e) {
    console.log(e);
  }

}

export const saveTodos = (todos) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      console.log('no token');
      throw Error('no token')
    };

    axios({
      url: `${ADDR}/todo/updateTodo`,
      method: 'put',
      headers: {
        'token': token
      },
      data: {
        todos: JSON.stringify(todos)
      }
    }); 
  }catch(e) {
    return false;
  }
}

//
export const toggleComplete = id => dispatch => {
  dispatch({ type: TOGGLE_COMPLETE, id});
}

export const toggleEdit = (value) => dispatch => {
  dispatch({ type: TOGGLE_EDIT, value });
}

export const toggleOnChange = (value) => dispatch => {
  dispatch({ type: TOGGLE_ON_CHANGE , value});
}

export const toggleAdding = () => dispatch => {
  dispatch({type: TOGGLE_ADDING});
}

//
export const login = (loginString, password) => async dispatch => {
  try {
    const res = await axios.post(`${ADDR}/todo/login`, {loginString, password});
    if (window.localStorage) {
      localStorage.setItem('username', res.data.username);
      localStorage.setItem("token", res.data.token);
    }
    dispatch({type: LOAD_TODOS, todos: res.data.todos});
    dispatch({type: SET_USERNAME, value: res.data.username});
  }catch(e) {
    return false;
  }
  return dispatch({type: LOGIN});
}

export const logout = (token) => async dispatch => {
  try{
    await axios({
      url: `${ADDR}/todo/logout`,
      method: 'post',
      headers: {
        'token': token
      }
    }); 
    if (window.localStorage) {
      localStorage.removeItem('data');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
    }
    dispatch({type: LOGOUT});
  }catch(e) {
    return false;
  }
}

export const register = (username, password, email) => async dispatch => {
  try {
    const res = await axios.post(`${ADDR}/todo/register`, {username, password, email});
    if (window.localStorage) {
      localStorage.setItem('username', res.data.username);
      localStorage.setItem('token', res.data.token);
    }
    dispatch({type: LOAD_TODOS, todos: res.data.todos});
    dispatch({type: SET_USERNAME, value: res.data.username});
    return dispatch({type: LOGIN});
  }catch(e) {
    return false;
  }
}
// export const handleToken = token => async dispatch => {
//   const res = await axios.post('/api/stripe', token);

//   dispatch({ type: FETCH_USER, payload: res.data });
// };

// export const submitSurvey = (values, history) => async dispatch => {
//   const res = await axios.post('/api/surveys', values);

//   history.push('/surveys');
//   dispatch({ type: FETCH_USER, payload: res.data });
// };

// export const fetchSurveys = () => async dispatch => {
//   const res = await axios.get('/api/surveys');

//   dispatch({ type: FETCH_SURVEYS, payload: res.data });
// };