import initialState from './initialState';
export default function (state = initialState.username || '', action) {
  switch (action.type){
    case 'SET_USERNAME':
      return state = action.value;
    default:
      return state;
  }
}