import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import Input from '../helpers/form/input';
import Textarea from '../helpers/form/textarea';
import Nav from '../navbar/index';
import { connect } from 'react-redux';
import { sendContactForm } from '../../actions';
import '../../section/contact.scss';

class Contact extends Component {
  state = {
    messageSent: false
  }

  submitHandler = (values) => {
    this.props.sendContactForm(values).then(() => this.setState(() => ({
        messageSent: true
      })));
    return values;
  }

  render(){
    const {handleSubmit, onSubmit, pristine, submitting } = this.props;

    if (this.props.email.success === true) {
      return <Redirect to='/confirmation' />
    }

    return (
      <div className='main-container'>
        <Nav/>
        <h1 className='contact'>Contact Us</h1>
        <form className='contact-us-form' onSubmit={handleSubmit(this.submitHandler)}>
          <div className='multiple-inputs-fields'>
            <div className="two-input-grouping">
              <p className='label'>First Name:</p>
              <Field name='firstName' type='text' component={ Input } />
            </div>
            <div className='two-input-grouping'>
              <p className='label'>Last Name:</p>
              <Field name='lastName' type='text' component={ Input } />
            </div>
          </div>
          <div className="multiple-inputs-fields">
            <div className='two-input-grouping'>
              <p className='label'>Phone Number:</p>
              <Field name='phoneNumber' type='text' component={ Input } />
            </div>
            <div className='two-input-grouping'>
              <p className='label'>Email Address:</p>
              <Field name='email' type='email' component={ Input } />
            </div>
          </div>
          <div className="message-input">
            <p className='textarea-label'>Message:</p>
            <Field name='message' type='text' component={ Textarea } />
          </div>
  
          <div className='button-container no-disclaimer'>
            <button type="submit" className='page-button' disabled={pristine || submitting} >Send</button>
          </div>         
        </form>
      </div>
    )
  }
}

const validate = (values) => {
  const errors = {};

  if(!values.firstName){
    errors.firstName = 'Field is Required'
  }

  if(!values.lastName){
    errors.lastName = 'Field is Required'
  }

  if(!values.phoneNumber){
    errors.phoneNumber = 'Field is Required'
  }

  if(!values.email){
    errors.email = 'Field is Required'
  }

  if(!values.message){
    errors.message = 'Field is Required'
  }

  return errors;
}

Contact = reduxForm({
    form: 'contact_form',
    validate
  })(Contact) ;

const mapStateToProps = state => {
  return {
    contact_form: state.form,
    email: state.email
  }
}

export default connect(mapStateToProps, { sendContactForm })(Contact); 
