const DEFAULT_STATE = {};

const emailReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'SEND_CONTACT_FORM':
      return action.payload.data
    default:
      return state
  }
};

export default emailReducer;