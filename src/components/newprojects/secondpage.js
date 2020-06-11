import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import {Redirect} from 'react-router-dom';
import Select from '../helpers/form/drop_down';
import Autosuggest from '../helpers/form/autosuggest';
import { connect } from 'react-redux';
import { sendProjectData, getProjectValues, getMyProjects, getMovieData } from '../../actions';
import Nav from '../navbar/index';
import Disclaimer from '../footer/disclaimer';

const years = [
  { text: '2019', value: '2019' },
  { text: '2020', value: '2020' },
  { text: '2021', value: '2021' },
  { text: '2022', value: '2022' },
  { text: '2023', value: '2023' },
  { text: '2024', value: '2024' },
  { text: '2025', value: '2025' }
]

const mpaa = [
  { text: 'G', value: 'G' },
  { text: 'PG', value: 'PG' },
  { text: 'PG-13', value: 'PG-13' }, 
  { text: 'R', value: 'R' },
  { text: 'NC-17', value: 'NC-17' }
]
         
const genre = [
  { text: 'Action', value: 'Action' },
  { text: 'Adventure', value: 'Adventure' },
  { text: 'Animation', value: 'Animation' },
  { text: 'Comedy', value: 'Comedy' },
  { text: 'Crime', value: 'Crime' },
  { text: 'Documentary', value: 'Documentary' },
  { text: 'Drama', value: 'Drama' }, 
  { text: 'Family', value: 'Family' },
  { text: 'Fantasy', value: 'Fantasy' }, 
  { text: 'History', value: 'History' },
  { text: 'Horror', value: 'Horror' },
  { text: 'Musical', value: 'Musical' },
  { text: 'Mystery', value: 'Mystery' },
  { text: 'Romance', value: 'Romance' },
  { text: 'Science Fiction', value: 'Science Fiction'},
  { text: 'Thriller', value: 'Thriller' },
  { text: 'War', value: 'War' },
  { text: 'Western', value: 'Western' }
]

const developmentStage = [
  { text: 'Pre-Production', value: 'Pre-Production' },
  { text: 'Production', value: 'Production' },
  { text: 'Post-Production', value:'Post-Production' },
  { text: 'Distribution', value: 'Distribution' }
]

const yearReleased = ({input, data, valueField, textField}) => {
  <DropdownList {...input}
    data={ data }
    valueField={ valueField }
    textField={textField }
    onChange={input.onChange}
  />
}

const required = value => value ? undefined : 'Field is Required';

class NewProjectSecondPage extends Component {
  state = {
    toComparables: false
  }
  
  buildOptions(data){
    return data.map(({text, value}) => <option key={value} value={value}>{text}</option> );
  }

  submitHandler = async (values) => { 
    if(values.developmentStage !== 'default'){
      // this.props.getProjectTitle(values.title),
      await this.props.sendProjectData(
        values, 
        this.props.page_one.title,
        this.props.page_one.runtime,
        this.props.page_one.logline,
        this.props.page_one.synopsis
      );
      this.props.getMovieData(values.film1, values.film2);
      this.props.destroy();
      this.setState({toComparables: true})
    }

    return values;
  }

  render(){
    const { handleSubmit, onSubmit, pristine, previousPage, submitting } = this.props;

    if (this.state.toComparables === true) {
      return <Redirect to='/comparisons' />
    }

    return (
      <div>
        <Nav/>
        <form className='new-project-form-page-2' onSubmit={handleSubmit(this.submitHandler)}>
          <div className='multiple-inputs-fields'>
            <div className='four-input-grouping'>
              <p className='page2-label'>Year of Release: <i className='fas fa-question-circle'><span className='tooltiptext year-tooltip'>Enter the year you expect to release the movie</span></i></p>
              <Field name='releasedYear' component = { Select } label = 'Estimated Year of Release:' defaultText='Select Year' options={this.buildOptions(years)} validate={required}/>
            </div>
            <div className='four-input-grouping'>
              <p className='page2-label'>Genre: <i className='fas fa-question-circle'><span className='tooltiptext'>Enter the genre of your movie</span></i></p>
              <Field name = 'genre' component = { Select } label = 'Genre:' defaultText = 'Select Genre' options={this.buildOptions(genre)} validate={required}/>
            </div>
            <div className='four-input-grouping'>
              <p className='page2-label'>MPAA Rating: <i className='fas fa-question-circle'><span className='tooltiptext'>Enter the target MPAA rating of your movie</span></i></p>
              <Field name = 'mpaa' component = { Select } label = 'Target MPAA Rating:' defaultText = 'Select MPAA' options={this.buildOptions(mpaa)} validate={required}/>
            </div>
            <div className='four-input-grouping'>
              <p className='page2-label'>Production Stage:<i className='fas fa-question-circle'>
                <span className='tooltiptext production-tooltip'>
                  <span className='definition'>Pre-Production: Planning the schedule, budget, location and cast</span>
                  <span className='definition'>Production: Filming has started</span>
                  <span className='definition'>Post-Production: Reviewing the footage and assembling the movie</span>
                  <span className='definition'>Distribution: Getting your film to cinemas, television networks and online platforms</span>
                </span></i></p>
              <Field name = 'developmentStage' component = { Select } label = 'Current Production Stage:' defaultText = 'Select Stage' options={this.buildOptions(developmentStage)} validate={required}/>
            </div>
          </div>
          <div className='multiple-inputs-fields'>
            <div className='film-input-grouping'>
              <p className='suggestion-label'>Film 1: <i className='fas fa-question-circle'><span className='tooltiptext'>Your movie can be compared to:</span></i></p>  
              <Field name='film1' component={Autosuggest} validate={required}/>
            </div>
            <div className='meets-container'>
              <h4 className='meets'>Meets</h4>
            </div>
            <div className='film-input-grouping'>
              <p className='suggestion-label'>Film 2: <i className='fas fa-question-circle'><span className='tooltiptext'>It can also be compared to:</span></i></p>
              <Field name='film2' component={Autosuggest} validate={required}/>
            </div>              
          </div>
          <div className='new-project-buttons button-container'>
            {/*<button type="button" className="previous page-button" onClick={previousPage}>
            Previous
          </button>*/}
          <button type="submit" className='page-button'>
            Submit
          </button>
          </div>
        </form>
        <Disclaimer/>
      </div>
    )
  }
}

NewProjectSecondPage = reduxForm({  
  form: 'newproject_form',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true, 
  initialValues: { 
    releasedYear: 'default',
    mpaa: 'default',
    genre: 'default',
    developmentStage: 'default'
  } 
})(NewProjectSecondPage);

const mapStateToProps = state => {
  return {
    page_one: state.project.project,
    project_form: state.form
  }
}

export default connect(mapStateToProps, { 
  sendProjectData, 
  getProjectValues,
  getMyProjects,
  getMovieData
})(NewProjectSecondPage); 