import React, { Component } from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import { sendToken } from '../../actions';

class InternationalGraphs extends Component{
    divisible = (value) => {
        if(value <= 10000){
            return (value/1000).toFixed(1)
        } else if(value <= 100000){
            return (value/10000).toFixed(1)
        } else if(value <= 1000000){
            return (value/100000).toFixed(1)
        } else if(value > 1000000){
            return (value/1000000).toFixed(1)
        }
    }

    componentDidUpdate(){
        let ctx =document.getElementById('internationalChart');
        let internationalChart = new Chart (ctx, {
            type: 'bar',
            data: {
                labels:['Theatrical', 'Home', 'TV'],
                datasets:[{
                    label: 'International Gross Earnings',
                    data: [
                        this.divisible(this.props.finance['theatrical, home, tv gross']),
                        this.divisible(this.props.finance['sales agent fee']),
                        this.divisible(this.props.finance['total net earnings'])
                    ],
                    borderColor: '#8e5ea2',
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.4)",
                        "rgba(54, 162, 235, 0.4)",
                        "rgba(255, 206, 86, 0.4)"
                      ],
                      borderColor: [
                        "rgb(255,99,132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 206, 86)"
                      ],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true,
                animation: {
                  easing: 'easeInCirc',
                  duration:2000
                },
                legend:{ 
                    display : false,
                    labels:{
                        fontColor:'#35f8c7',
                        padding: 3,
                        fontStyle:'normal'
                    }
                },
                title:{
                    display:true,
                    padding:5,
                    fontColor:'#35f8c7',
                    fontFamily: 'sans-serif'
                },
                tooltips: {
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  titleFontSize: 16,
                  titleFontColor: '#000',
                  bodyFontColor: '#000',
                  bodyFontSize: 16
                }
            }
        })
    }

    render(){
        return  <canvas id='internationalChart' width='200' height ='50'></canvas>;
    }
}

const mapStateToProps = state => {
    return {
        finance: state.token.shareableList[0]['international']
    }
}

export default connect(mapStateToProps, {
    sendToken
})(InternationalGraphs);
