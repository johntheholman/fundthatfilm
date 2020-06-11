const DEFAULT_STATE = {
  user: {}
};

const newAccountReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'CREATE_ACCOUNT':
      return {user: action.payload.data}
    default:
      return state
  }
};

export default newAccountReducer;