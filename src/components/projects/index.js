import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getMyProjects, signIn, getFinancialData, getMovieData } from '../../actions';
import Nav from '../navbar/index';
import '../../section/projects.scss'; 

var projectCard;

class Projects extends Component {
  state = {
    toComparables: false,
    toFinancials: false
  }

  componentDidMount(){
    this.props.getMyProjects();
  }

  seeComparables = (projectId) => {
    this.props.getMovieData(this.props.project_info[projectId][0].title, this.props.project_info[projectId][1].title);
    this.setState({toComparables: true})
  }

  seeFinancials = (projectId) => {
    this.props.getFinancialData(this.props.project_info[projectId][0].id, this.props.project_info[projectId][1].id).then(() => {
      this.setState({toFinancials: true})
    })
  }

  buildProject = (project) => {
    return (
      <div key={project.id} className='project-container'>
        <h2 className='project-title'>{project.title}</h2>
        <div className='four-fields'>
          <p><span className='green'>Genre:</span> {project.genre}</p>
          <p><span className='green'>Runtime:</span> {project.runtime}</p>
          <p><span className='green'>MPAA Rating:</span> {project.mpaa_rating}</p>
          <p><span className='green'>Release Year:</span> {project.year}</p>
        </div>
        <div className='two-fields'>
          <p className='production'><span className='green'>Production Stage:</span> {project.production_stage}</p>
          <p className='logline'><span className='green'>Logline:</span> {project.logline}</p>
        </div>
        <p className='synopsis'><span className='green'>Synopsis:</span> {project.synopsis}</p>
        <div className="my-projects-button-container">
          <button className='my-project-comparables-button page-button' onClick={() => {this.seeComparables(project.id)}}>Comparables</button>
          <button className='my-project-financial-button page-button' onClick={() => {this.seeFinancials(project.id)}}>Financials</button>
        </div> 
      </div>
    )
  }

  render(){
    const { my_projects } = this.props;
    
    if (this.state.toComparables === true) {
      return <Redirect to='/comparisons' />
    } else if (this.state.toFinancials === true){
      return <Redirect to='/financials' />
    }

    if(my_projects){
      projectCard = this.props.my_projects.map(this.buildProject);
    } 

    return (
      <div className='main-container'>
        <Nav />
        <h1 className='my-projects-title'>My Projects</h1>
        {my_projects ? projectCard : (
            <div className='no-projects'>
              <h2>You don't have any projects...</h2>
              <Link to='/new_project'>
                <button className='page-button'>Create One!</button>
              </Link>
            </div>
          ) 
        }
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    my_projects: state.myprojects.data,
    project_info: state.myprojects.projects,
    user_info: state.user
  }
}

export default connect(mapStateToProps, {
    getMyProjects, signIn, getFinancialData, getMovieData
})(Projects);
