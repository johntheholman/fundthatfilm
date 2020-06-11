import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import {Redirect, Link } from 'react-router-dom';
import NorthAmerica from './northAmerica'; 
import International from './international';
import Global from './global';
import Other from './other';
import OtherGraphs from '../charts.js/other';
import GlobalGraphs from '../charts.js/global';
import InternationalGraphs from '../charts.js/international';
import NorthAmericaGraphs from './../charts.js/northamerica';
import Disclaimer from '../footer/disclaimer';
import Preloader from '../preloader/index';
import Register from '../newuser/register';
import Nav from '../navbar/index';
import { connect } from 'react-redux';
import { getFinancialData, getMovieData, signIn, sendToken, scrollable, showModal } from '../../actions';

const token = 'f1f3aabffb332762c3c9c0cd87f9e280380d0a8b';

class FinancialNorthAmerica extends Component {
  state = {
    toShareable: false,
    scrollable: 'no-scroll'
  }

  componentWillMount(){
    if(localStorage.getItem('logged-in')){
      this.props.scrollable('yes-scroll')
    }
  }

  render(){
    const { session, modal, scroll } = this.props;

    return (
      <div className={'main-container ' + scroll }>
      {!localStorage.getItem('logged-in') && modal && <Register />}
        <Preloader/>
        <Nav/>
        <Link to={`/invest/${token}`} target="_blank">
          <button className="share_button page-button">Share</button>
        </Link>
        <div id="financial-container">
          <h1 className='financial-charts-header'>Financial Calculations</h1>
            <Tabs defaultActiveKey='northAmerica'>
              <Tab eventKey='northAmerica' title='North America' className='tab'>
                <div className='graph-container'>
                  <h1 className='chart-header'>Production Gross in Millions</h1>
                  <NorthAmericaGraphs/>
                </div>
                <NorthAmerica/>
              </Tab>
              <Tab eventKey='international' title='International'>
                <div className='graph-container'>
                  <h1 className='chart-header'>International Gross Earnings</h1>
                  <InternationalGraphs/>
                </div>
                <div className='international-tab-wrapper'>
                   <International/>
                </div>
              </Tab>
              <Tab eventKey='global' title='Global'>
                <div className='graph-container'>
                  <h1 className='chart-header'>Global Consumer Products</h1>
                  <GlobalGraphs/>
                </div>
                <Global/>
              </Tab>
              <Tab eventKey='other' title='Other'>
              <div className='other-northAmerican-graph-container'>
                <div className='graph-container'>
                  <h1 className='chart-header'>Distributors To Cost Ratio</h1>
                  <OtherGraphs/>
                </div>
                <Other/>
              </div>
              </Tab>
            </Tabs>
        </div>
        <Disclaimer/>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    movies: state.movies.movieList,
    finance: state.finance.financeList,
    session: state.session,
    scroll: state.scrollable.scrollable,
    modal: state.modal.showModal
  }
}

export default connect(mapStateToProps, {
    getFinancialData, 
    getMovieData, 
    signIn, 
    // register, 
    sendToken, 
    scrollable,
    showModal
})(FinancialNorthAmerica);