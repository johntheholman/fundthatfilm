import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFinancialData, getMovieData } from '../../actions';
import Nav from '../navbar/index';
import Disclaimer from '../footer/disclaimer';
import Preloader from '../preloader/index';

class DetailsPage extends Component {
  mapThroughObjects(items){
    let newArray = []
    for(let i = 0; i < items.length; i++){
        newArray.push(items[i].name + '')
    }
    return newArray.join(', ')  
  }

  handleConfirm = () => {
    this.props.getFinancialData(this.props.movies[0].id, this.props.movies[1].id);
  }

  buildMovieDetails(){
    const { movies } = this.props;

    return this.props.movies.map( movie => {
      return (
        <div key={ movie.id } className='details'>
          <h4 className='green'>{ movie.title }</h4>
          <div className='movie-details'>
            <div className='poster-section'>
              <img src= { movie.image_url } className='details-image'/>
            </div>
            <div className='details-section'>
              <div>
                <p><span className='green'>Genre: </span><br/>
                  { movie.genre ? movie.genre : 'N/A' }</p>
                <p><span className='green'>Rating: </span><br/>
                  { movie.mpaa_rating ? movie.mpaa_rating : 'N/A'}</p>
                <p><span className='green details-desktop'>Audience Satisfaction: </span><br/>
                  { parseInt(movie.audience_satisfaction) ? (movie.audience_satisfaction * 100) + '%' : 'N/A'}</p>
                {/*<p><span className='green details-mobile'>Audience<br/>Satisfaction: </span><br/>
                  { parseInt(movie.audience_satisfaction) ? (movie.audience_satisfaction * 100) + '%' : 'N/A'}</p>*/}
              </div>
              <div>
                <p><span className='green'>Budget: </span><br/>
                  {parseInt(movie.budget) ? '$' + parseInt(movie.budget).toLocaleString() : 'N/A'}</p>
                <p><span className='green'>U.S. Box Office: </span><br/>
                  {parseInt(movie.us_gross_bo) ? '$' + parseInt(movie.us_gross_bo).toLocaleString() : 'N/A'}</p>
                <p><span className='green details-desktop'>International Box Office: </span><br/>
                  {parseInt(movie.intl_gross_bo) ? '$' + parseInt(movie.intl_gross_bo).toLocaleString() : 'N/A'}</p>
              {/*<p><span className='green details-mobile'>International<br/>Box Office: </span><br/>
                  {parseInt(movie.intl_gross_bo) ? '$' + parseInt(movie.intl_gross_bo).toLocaleString() : 'N/A'}</p>*/}
              </div>
            </div>
          </div>
          <div>
            <p><span className='green'>Funding Partners: </span><br/>
              { movie.funding_partners_info ? this.mapThroughObjects(movie.funding_partners_info) : 'N/A'}</p>
            <p><span className='green'>Distribution Company: </span><br/>
              { movie.distribution_companies_info ? this.mapThroughObjects(movie.distribution_companies_info) : 'N/A'}</p>
          </div>
        </div>
      )
    })
  }  

  render(){
    const {movies} = this.props;

    if(!movies){
      return <Preloader/>
    }
   
    return ( 
      <div className='main-container details-container'>
        <Nav/>
        <h1 className='details-title'>Movie Details</h1>
        <div className='details-info-container'>
            { this.buildMovieDetails() }
        </div>
        <div className='button-container detail-buttons'>
          <Link to='/financials'>
            <button onClick={this.handleConfirm} className='input-submit-button details-page-button page-button'>Confirm</button>
          </Link>
        </div>
        <Disclaimer/>
     </div>
    )
  }  
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movieList
  }
}

export default connect(mapStateToProps, {
  getMovieData, getFinancialData
})(DetailsPage);