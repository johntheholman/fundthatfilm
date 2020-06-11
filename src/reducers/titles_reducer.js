const DEFAULT_STATE = {
  title1: '',
  title2: ''
};

const titlesReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'COMPARABLE_MOVIES':
      return {
        title1: action.payload.title1,
        title2: action.payload.title2
      }
    default:
      return state
  }
};

export default titlesReducer;