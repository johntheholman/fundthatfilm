    import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import { Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { sendToken } from '../../actions';
import Preloader from '../preloader/index';

class Global extends Component {
    componentDidMount(){
        this.props.finance;
    }

    render(){
        const { finance } = this.props;

        if(!finance['royalties gross']){
            return <Preloader/>;
        }

        return(
            <div className='card-financial-global-wrapper'>
                <div className='card financial-card global-card'>
                    <h5 className='financial-header'>GLOBAL</h5>
                    <div className='financial-body global-body'>
                        <p><span className='green'>Royalties Gross:</span><br/> ${this.props.finance['royalties gross'].toLocaleString()}</p>
                        <p><span className='green'>Merchandising Distribution Fee:</span><br/> ${this.props.finance['merchandising distribution fee'].toLocaleString()}</p>
                        <p><span className='green'>Sales Agent Fee:</span><br/> ${this.props.finance['sales agent fee'].toLocaleString()}</p>
                        <p><span className='green'>Distributor's Net:</span><br/> ${this.props.finance["distributor's net"].toLocaleString()}</p>
                    </div>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        finance: state.token.shareableList[0]['global consumer products']
    }
}

export default connect(mapStateToProps, {
  sendToken
})(Global);