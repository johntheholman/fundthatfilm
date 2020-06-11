const DEFAULT_STATE = {
  movieList: []
};

const movieReducer = (state = DEFAULT_STATE, action) => {
  switch(action.type){
    case 'GET_MOVIE_DATA':
      return {movieList: action.payload.data}
    default:
      return state
  }
};

export default movieReducer; 