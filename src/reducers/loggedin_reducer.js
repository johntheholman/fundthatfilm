const DEFAULT_STATE = {};

const loggedinReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'IS_LOGGED_IN?':
      return action.payload.data
    default:
      return state
  }
};

export default loggedinReducer;