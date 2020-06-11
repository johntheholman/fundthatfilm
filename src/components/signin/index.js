import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import Input from '../helpers/form/input';
import Nav from '../navbar/index';
import { connect } from 'react-redux';
import { signIn } from '../../actions';
import '../../section/signin.scss';

const validate = value => value ? undefined : 'Field is Required';

class SignIn extends Component {

  loginHandler = (values) => {
    this.props.signIn(values.email, values.password);
    return values;
  }

  render(){
    const { handleSubmit, onSubmit } = this.props;

    if (this.props.sign_in) {
      return <Redirect to='/my_projects' />
    } 

    return (
      <div className='main-container sign-in'>
        <Nav/> 
        <h1 className='signin-title'>Sign In</h1>
        <form className='sign-in-form' onSubmit={handleSubmit(this.loginHandler)}>
          <p className='label'>Email Address:</p>
          <Field name='email' type='email' component={ Input } validate={ validate } />
          <p className='label'>Password:</p>
          <Field name='password' type='password' component={ Input } validate={ validate } />
          <div className='button-container no-disclaimer'>
            <button type="submit" className='page-button'>Login</button>
          </div>
        </form>
      </div>
    )
  }
}

SignIn = reduxForm({
    form: 'sign_in_form',
    validate
  })(SignIn) ;

const mapStateToProps = state => {
  return {
    sign_in: state.session.login,
    // register: state.session.register,
    sign_in_form: state.form
  }
}

export default connect(mapStateToProps, { 
  signIn, 
  // register 
})(SignIn); 