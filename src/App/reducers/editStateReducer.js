export default function (state = {
  onChange: false, 
  isAdding: false,
  onEdit: false,
  isEditTitle: false
}, action) {
  switch (action.type){
    // toggles if todo list state is changing
    case 'TOGGLE_ON_CHANGE':
      return {
        ...state,
        onChange: typeof action.value !== 'undefined' ? action.value : !state.onChange
      }
    // toggles if a new todo item is being added to todo list
    case 'TOGGLE_ADDING':
      return {
        ...state,
        isAdding: typeof action.value !== 'undefined' ? action.value : !state.isAdding
      }
    // toggles if a todo list is being edit( delete or change text)
    case 'TOGGLE_EDIT':
      return {
        ...state,
        onEdit: typeof action.value !== 'undefined' ? action.value : !state.onEdit
      }
    // toggles if title of a todo list is being changed
    case 'TOGGLE_EDIT_TITLE':
      return {
        ...state,
        isEditTitle: action.value
      }
    default:
      return state;
  }
}