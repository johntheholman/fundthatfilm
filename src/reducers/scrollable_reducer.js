const DEFAULT_STATE = {
  scrollable: 'no-scroll'
};

const scrollableReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'SCROLLABLE':
      return {scrollable: action.payload}
    default:
      return state
  }
};

export default scrollableReducer;