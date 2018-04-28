import uuid from 'node-uuid';
import initialState from './initialState';

export default function(state = initialState.todos || [], action) {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: uuid(),
          text: action.text,
          complete: false
        }
       ];

    case 'DEL_TODO':
      return state.filter((todo) => todo.id !== action.id);

    case 'toggleComplete':
      return state.map((todo) => {
        if (todo.id === action.id) {
          todo.complete = !todo.complete;
        }
        return todo;
      });

    case 'LOAD_TODOS':
      // should be a Array;
      return action.todos;

    default:
      return state;
  }
}