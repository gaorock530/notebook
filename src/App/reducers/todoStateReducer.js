export default function (state = {
  listID: null,
  listTitle: null
}, action) {
  switch (action.type){
    // enter a subset of a todolist
    case 'ENTER_LIST':
      return {
        ...state,
        listTitle: action.title,
        listID: action.id
      }
    // back on top of a list of all subsets
    case 'QUIT_LIST':
      return {
        listTitle: null,
        listID: null
      }
      
    default:
      return state;
  }
}