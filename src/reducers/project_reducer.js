const DEFAULT_STATE = {
  project: {}
};

const projectReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'GET_PROJECT_VALUES':
      return {project: action.payload}
    default:
      return state
  }
};

export default projectReducer; 