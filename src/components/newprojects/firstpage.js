import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../helpers/form/input';
import Textarea from '../helpers/form/textarea';
import Nav from '../navbar/index';
import Disclaimer from '../footer/disclaimer';

const required = value => value ? undefined : 'Field is Required';
const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;

class NewProjectFirstPage extends Component {
  render(){
    const { handleSubmit } = this.props;

    return (
      <div>
        <Nav/>
        <form className='new-project-form' onSubmit={handleSubmit}>
          <div className='single-line-input'>
            <p className='title-label'>Movie Title: <i className='fas fa-question-circle'><span className='tooltiptext'>Enter the working title of your movie</span></i></p>
            <Field name='title' type='text' component={Input} validate={required}/>
          </div>

          <div className='multiple-inputs-fields'>
            <div className='two-input-grouping'>
              <p className='label'>Estimated Runtime: <i className='fas fa-question-circle'><span className='tooltiptext'>Enter the estimated runtime in minutes</span></i></p>
              <Field name='runtime' type='number' component={Input} validate={required}/>
            </div>
            <div className='two-input-grouping'>
              <p className='label'>Logline: <i className='fas fa-question-circle'><span className='tooltiptext logline-tooltip'>Describe the core conflict of the story in one sentence</span></i></p>
              <Field name='logline' type='text' component={Input} validate={required}/>
            </div>
          </div>

          <div className='message-input'>
            <p className='textarea-label'>Synopsis: <i className='fas fa-question-circle'><span className='tooltiptext synopsis-tooltip'>Enter a brief summary of what your movie is about</span></i></p>
            <Field name='synopsis' type='text' component={ Textarea } validate={required}/>
          </div>

          <div className='button-container'>
            <button type="submit" className="next page-button">
              Next
            </button>
          </div>
        </form>
        <Disclaimer/>
      </div>
    )
  }
}

export default reduxForm({
  form: 'newproject_form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
})(NewProjectFirstPage);