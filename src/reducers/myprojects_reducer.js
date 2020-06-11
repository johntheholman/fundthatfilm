const DEFAULT_STATE = {
  // my_projects: [ 
  //   {'id':'',
  //    'title':'',
  //    'year':'',
  //    'logline':'',
  //    'synopsis':'',
  //    'production_stage':'',
  //    'genre':'',
  //    'runtime':'',
  //    'mpaa_rating':''
  //   }
  // ]
};

const myProjectsReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'GET_MY_PROJECTS':
      // return {my_projects: action.payload.data.data}
      return action.payload.data
    default:
      return state
  }
};

export default myProjectsReducer; 