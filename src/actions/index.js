import axios from 'axios'; 

export const createAccount = (values, projectID) => {
  const { name, email, password } = values;

  return async dispatch => {
    const response = await axios.post('/api/signup.php', {
        name,
        email, 
        password,
        project_id: projectID
      } 
    );

    dispatch({
      type: 'CREATE_ACCOUNT',
      payload: response
    });
  }
}

export const getFinancialData = (id1, id2) => {
  return async dispatch => {
    const response = await axios.get('/api/financial.php', {
      params: {
        id1,
        id2
      }
    });

    dispatch({
      type: 'GET_FINANCIAL_DATA',
      payload: response
    });
  }
}

export const getMovieData = (film1, film2) => {
  return async dispatch => {
    const response = await axios.get('/api/comparables.php', {
      params: {
        title1: film1,
        title2: film2
      }
    });

    dispatch({
      type: 'GET_MOVIE_DATA',
      payload: response.data
    });
  }
}

// export const getMovieTitles = (title1, title2) => {
//   return {
//     type: 'COMPARABLE_MOVIES',
//     payload: {title1, title2}
//   };
// }

export const getMyProjects = () => {
  return async dispatch => {
    const response = await axios.get('/api/myprojects.php');

    dispatch({
      type: 'GET_MY_PROJECTS',
      payload: response
    });
  }
}

export const getProjectValues = values => {
  return {
    type: 'GET_PROJECT_VALUES',
    payload: values
  }
}

export const loggedIn = () => {
  return async dispatch => {
    try {
      const { data: { login } } = await axios.get('/api/isloggedin.php');

      if(login){
        return dispatch({
          type: 'SIGN_IN',
          payload: {}
        });
      }

      throw new Error('Not signed in');

    } catch(err){
      dispatch({
        type: 'SIGN_OUT'
      });
    }
  }
}

export const showModal = boolean => {
  return {
    type: 'SHOW_MODAL',
    payload: boolean 
  }
}

export const scrollable = value => {
  return {
    type: 'SCROLLABLE',
    payload: value
  }
}

export const sendContactForm = values => {
  const { firstName, lastName, phoneNumber, email, message } = values;

  return async dispatch => {
    const response = await axios.post('/api/contactform.php', {
        firstName, lastName, phoneNumber, email, message
    })

    dispatch({
      type: 'SEND_CONTACT_FORM',
      payload: response
    })
  }
}

export const sendProjectData = (values, title, runtime, logline, synopsis) => {
  const { releasedYear, genre, mpaa, developmentStage, film1, film2 } = values;

  return async dispatch => {
    const response = await axios.post('/api/addproject.php', {
      newProject: {
        title, runtime, logline, releasedYear, genre, mpaa, developmentStage, synopsis, film1, film2
      } 
    });

    const compare = {
      title1: film1,
      title2: film2,
    }

    dispatch({
      type: 'STORE_MOVIE_COMPARISONS',
      payload: {compare, response}
    });
  }
}

export const signIn = (email, password) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/signin.php', {
        login: {
          email, password
        } 
      });

      const { data: { success, login } } = response;

      if(success && login){

        let name = response.data.user.name;

        localStorage.setItem('logged-in', 'true');
        localStorage.setItem('user', name);

        return dispatch({
          type: 'SIGN_IN',
          payload: response
        });
      }

      throw new Error('Sign In Failed');
      
    } catch(err){
      console.log('Sign In Failed, dispatch an action to handle log in failure');
    }
    
  }
}

export const signOut = () => {
  return async dispatch => {
    const response = await axios.get('/api/signout.php');

    // localStorage.removeItem('logged-in');
    localStorage.clear();

    dispatch({
      type: 'SIGN_OUT',
      payload: response
    });
  }
}

export const sendToken = (token) => {
  return async dispatch => {
    const response = await axios.get('/api/sharable.php', {
      params: {token: token}
    });

    dispatch({
      type: 'SEND_TOKEN',
      payload: response
    });
  }
}

export const toggleNavbar = boolean => {
  return {
    type: 'TOGGLE_NAVBAR',
    payload: boolean
  }
}