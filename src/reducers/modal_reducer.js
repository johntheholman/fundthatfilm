const DEFAULT_STATE = {
  showModal: true,
};

const modalReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'SHOW_MODAL':
      return {showModal: action.payload}
    default:
      return state
  }
};

export default modalReducer;