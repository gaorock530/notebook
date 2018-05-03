import axios from 'axios';
import {ADDR} from '../../config/config';
import {
  // list
  ADD_LIST,
  DEL_LIST,
  CHANGE_LIST_TITLE,
  LOAD_LIST,
  // list state
  ENTER_LIST,
  QUIT_LIST,
  // todo
  ADD_TODO,
  DEL_TODO,
  LOAD_TODOS,
  TOGGLE_COMPLETE,
  // Loading todoList
  LOAD_WHOLE_TODOS_TO_STATE,
  // user act
  TOGGLE_EDIT,
  TOGGLE_ON_CHANGE,
  TOGGLE_ADDING,
  TOGGLE_EDIT_TITLE,
  // authentication
  LOGIN,
  LOGOUT
} from './types';

// List State
export const enterList = (listID, listTitle) => dispatch => {
  dispatch({ type: ENTER_LIST, id: listID, title: listTitle});
}

export const quitList = () => dispatch => {
  dispatch({ type: QUIT_LIST });
}


// Todo List Actions
export const addList = (title, todos = []) => dispatch => {
  dispatch({ type: ADD_LIST, title, todos });
}

export const delList = (id) => dispatch => {
  dispatch({ type: DEL_LIST, id});
}

export const loadList = () => dispatch => {
  dispatch({ type: LOAD_LIST });
}

export const changeListTitle = (id, title) => dispatch => {
  dispatch({ type: CHANGE_LIST_TITLE, id, title});
}

// Todos Actions
export const addTodo = (id, text) => dispatch => {
  dispatch({ type: ADD_TODO, id, text }); 
};

export const toggleComplete = (id, _id) => dispatch => {
  dispatch({ type: TOGGLE_COMPLETE, id, _id});
}

export const delTodo = (id, _id) => dispatch => {
  dispatch({ type: DEL_TODO, id, _id});
}

export const loadTodos = (id) => async dispatch => {
  dispatch({ type: LOAD_TODOS, id});
}

export const saveTodos = (id, title, todos) => async dispatch => {
  try {
    const token = localStorage.getItem('token');
    if (!token || token === '') {
      console.log('no token');
      return false;
    };

    axios({
      url: `${ADDR}/todo/updateTodo`,
      method: 'put',
      headers: {
        'token': token
      },
      data: {
        id,     // list ID
        title,  // list title
        todos: JSON.stringify(todos)   // list todos
      }
    }); 
  }catch(e) {
    console.log(e);
    return false;
  }
}

export const loadingWholeList = (token) => async dispatch => {
  try {
    const res = await axios({
      url: `${ADDR}/todoList`,
      method: 'get',
      headers: {
        'token': token
      }
    });

    dispatch({ type: LOAD_WHOLE_TODOS_TO_STATE, todoList: res.data});
  }catch(e) {
    console.log(e);
    return false;
  }
}




// User State Actions
export const toggleEdit = (value) => dispatch => {
  dispatch({ type: TOGGLE_EDIT, value });
}

export const toggleOnChange = (value) => dispatch => {
  dispatch({ type: TOGGLE_ON_CHANGE , value});
}

export const toggleAdding = (value) => dispatch => {
  dispatch({type: TOGGLE_ADDING, value});
}

export const toggleEditTitle = (value, id, title) => dispatch => {
  dispatch({ type: CHANGE_LIST_TITLE, id, title});
  dispatch({ type: ENTER_LIST, id, title});
  dispatch({ type: TOGGLE_EDIT_TITLE, value });
}

// Login / Logout
export const login = (loginString, password) => async dispatch => {
  try {
    const res = await axios.post(`${ADDR}/todo/login`, {loginString, password});
    if (window.localStorage) {
      localStorage.setItem("token", res.data.token);
    }
    dispatch({type: LOGIN, username: res.data.username});
    return true;
  }catch(e) {
    console.log(e);
    return false;
  }
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
      localStorage.removeItem('token');
    }
    dispatch({type: LOGOUT});
  }catch(e) {
    console.log(e);
    return false;
  }
}

export const register = (username, password, email) => async dispatch => {
  try {
    const res = await axios.post(`${ADDR}/todo/register`, {username, password, email});
    if (window.localStorage) {
      localStorage.setItem('token', res.data.token);
    }
    dispatch({ type: LOGIN, username: res.data.username });
  }catch(e) {
    console.log(e);
    return false;
  }
}

export const verifyAuth = () => async dispatch => {
  let token = null;
  try {
    if (window.localStorage) {
      token = localStorage.getItem('token');
    }
    if (!token) return false;
    const res = await axios({
      url: `${ADDR}/todo/isLogin`,
      method: 'post',
      headers: {
        'token': token
      }
    }); 
    if (res.status !== 200) return false;
    dispatch({ type: LOGIN, username: res.data.username});
  }catch(e) {
    console.log(e);
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