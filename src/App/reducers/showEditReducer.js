export default function (state = false, action) {
  switch (action.type){
    case 'toggleEdit':
      return state = typeof action.value !== 'undefined' ? action.value : !state;
    default:
      return state;
  }
}