import { Button } from 'reactstrap';
import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import Test from './test';
import CardsContainer from './aboutus';
import Contact from './contact';
import Details from './comparables/details';
import Disclaimer from './footer/disclaimer';
import EmailSent from './contact/messagesent';
import Financial from './financial';
import Home from './home';
import MovieComparison from './comparables';
import NewProject from './newprojects';
import MyProjects from './projects';
import Register from './newuser';
import Shareable from './shareable/shareable';
import SignIn from './signin';
import Terms from './terms';
import { signIn, toggleNavbar, loggedIn } from '../actions';
import { connect } from 'react-redux';
import auth from '../hoc/auth';

class App extends Component {

  hideNavbar = () => {
    this.props.toggleNavbar(false);
  }

  componentWillMount(){
    window.addEventListener('click', this.hideNavbar, true);
  }

  render(){
    return (    
      <main>
        <div className='route-container'>
          <Route exact path='/' component={ Home } />
          <Route path='/sign_in' component={ () => <SignIn /> } />
          <Route path='/new_project' component={ () => <NewProject /> } />
          <Route path='/my_projects' component={ auth(MyProjects, this.props.sign_in) } />
          <Route path='/comparisons' component={ () => <MovieComparison /> } />
          <Route path='/details' component={ () => <Details /> }/>
          <Route path='/financials' component={ () => <Financial /> } />
          <Route path='/invest' component={ () => <Shareable /> } />
          <Route path='/register' component={ () => <Register /> } />
          <Route path='/contact' component={ () => <Contact /> } />
          <Route path='/confirmation' component={ () => <EmailSent /> } />
          <Route path='/about' component={ CardsContainer }/>   
          <Route path='/terms_and_conditions' component={ Terms } />
        </div>
      </main>
    )
  }
};

const mapStateToProps = state => {
  return {
    sign_in: state.session.login
  }
}

export default withRouter(connect(mapStateToProps, {
  signIn, toggleNavbar, loggedIn
})(App));



