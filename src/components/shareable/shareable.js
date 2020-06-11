import React, { Component } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import NorthAmerica from './northAmerica';
import International from './international';
import Global from './global';
import Other from './other';
import OtherGraphs from '../shareablecharts/other';
import GlobalGraphs from '../shareablecharts/global';
import InternationalGraphs from '../shareablecharts/international';
import NorthAmericaGraphs from './../shareablecharts/northamerica';
import Disclaimer from '../footer/disclaimer';
import Preloader from '../preloader/index';
import { connect } from 'react-redux';
import { sendToken, getProjectValues } from '../../actions';

const token = 'f1f3aabffb332762c3c9c0cd87f9e280380d0a8b';

class Shareable extends Component {
  componentDidMount(){
    this.props.sendToken(token);
  }

  render(){
    return (
      <div className='main-container'>
         <Preloader/>
        <div id="financial-container">
          <h1 className='shareable-header'>Financial Calculations { this.props.projectTitle.title }</h1>
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
    projectTitle: state.project.project
  }
}

export default connect(mapStateToProps, {
  getProjectValues, 
  sendToken
})(Shareable);