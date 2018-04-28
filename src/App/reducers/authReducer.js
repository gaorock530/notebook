import initialState from './initialState';

export default function (state = initialState.isLogin || false, action) {
  switch (action.type){
    case 'LOGIN':
      return state = true;
    case 'LOGOUT':
      return state = false;
    default:
      return state;
  }
}