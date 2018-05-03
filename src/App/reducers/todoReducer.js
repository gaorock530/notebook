export default function(state = [] || [], action) {
  switch (action.type) {
    case 'ADD_LIST': // title, todos
      return [
        ...state,
        {
          title: action.title,
          todos: action.todos
        }
      ];
    
    case 'CHANGE_LIST_TITLE': // id, title => Array
      return state.map((list) => {
        if (list.id === action.id) {
          list.title = action.title;
        }
        return list;
      });

    case 'DEL_LIST': // id
      return state.filter((list) => list.id !== action.id);

    case 'LOAD_LIST':
      return state.map(list => list.title);

    /////////////////////
  
    case 'ADD_TODO': // id, text
      return state.map((list) => {
        if (list.id === action.id) {
          list.todos.push({
            text: action.text,
            complete: false
          })
        }
        return list;
      });

    case 'DEL_TODO': // id, _id
      return state.map((list) => {
        if (list.id === action.id) {
          list.todos = list.todos.filter(todo => todo._id !== action._id)
        }
        return list;
      });

    case 'LOAD_TODOS': // id
      return state.filter((list) => list.id === action.id);
      
    case 'TOGGLE_COMPLETE': // id, _id
      return state.map((list) => {
        if (list.id === action.id) {
          list.todos = list.todos.map((todo) => {
            if (todo._id === action._id) {
              todo.complete = !todo.complete;
            }
            return todo;
          })
        }
        return list;
      });
    
    // load every todoList to state
    case 'LOAD_WHOLE_TODOS_TO_STATE':
      return action.todoList;
      
    default:
      return state;
  }
}