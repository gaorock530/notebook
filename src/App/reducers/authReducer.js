export default function (state = {
  isLogin: false,
  username: ''
}, action) {
  switch (action.type){
    case 'LOGIN':
      return {
        username: action.username,
        isLogin: true
      };
    case 'LOGOUT':
      return {
        username: '',
        isLogin: false
      };

    default:
      return state;
  }
}