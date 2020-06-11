const DEFAULT_STATE = {
  login: false,
  // register: true,
  user: null
};

const userSessionReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'SIGN_IN':
      return { user: localStorage.getItem('user'), login: true };
    case 'SIGN_OUT':
      return { ...state, login: false };
    case 'LOGGED_IN?':
      return {login: action.login}
    default:
      return state
  }
};

export default userSessionReducer;