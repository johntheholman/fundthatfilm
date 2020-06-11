import React, { Component } from 'react';
import { Field } from 'redux-form';
import axios from 'axios';
import _ from 'lodash';
import apiKey from '../../../config/tmdb.js';
import film from '../../../assets/images/film.jpg';

const moviePoster = 'https://image.tmdb.org/t/p/w600_and_h900_bestv2';

class Autocomplete extends Component {
  state = {
    fetchedSuggestions: []
  }

  fetchSuggestions = _.debounce((movieTitle) =>{
    axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + apiKey + '&query=' + movieTitle).then(response => {
      let top5 = response.data.results.splice(0, 5);
      this.setState({
        fetchedSuggestions: top5
      })
    }) 
  }, 300)

  handleChange = (event) => {
    let titleInput = event.target.value;
    this.props.input.onChange(titleInput);
    this.fetchSuggestions(titleInput)
  };

  handleClick = (movie) => {
    this.props.input.onChange(movie);
    this.setState({
      fetchedSuggestions: []
    })
  }

  buildSuggestions = (movie) => {
    return (
      <li key={movie.id} onClick={() => {
        this.handleClick(movie.title)
      }}>
        <img className='movie-poster' src={movie.poster_path ? moviePoster + movie.poster_path : film} /> {movie.title}
      </li>
    )
  }

  render(){
    const { input, meta:{ touched, error }, ...props } = this.props;

    return (
      <div className='autocomplete-input'>
        <input {...input} onChange={this.handleChange} {...props} autoComplete='off' />
        <ul className='suggestion-list'>
          {this.state.fetchedSuggestions.map(this.buildSuggestions)}
        </ul>
        <p className='required'>{ touched && error }</p>
      </div>
    )
  }
}

export default Autocomplete;