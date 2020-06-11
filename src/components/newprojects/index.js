import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NewProjectFirstPage from './firstpage';
import NewProjectSecondPage from './secondpage';
import { connect } from 'react-redux';
import { getProjectValues } from '../../actions';

class NewProject extends Component {
  state = {
    page: 1
  }

  nextPage = (values) => {
    this.props.getProjectValues(values);
    this.setState({ page: this.state.page + 1 });
  }

  previousPage = () => {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (
      <div className='main-container new-project'>
        <h1 className='new-project-title'>Project Information</h1>
        {page === 1 && <NewProjectFirstPage onSubmit={this.nextPage} />}
        {page === 2 && (
          <NewProjectSecondPage
            previousPage={this.previousPage}
            onSubmit={this.onSubmit}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    project: state
  }
} 

export default connect(mapStateToProps, {
  getProjectValues
})(NewProject);