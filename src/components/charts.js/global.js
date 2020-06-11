import React, { Component } from 'react';
import Chart from 'chart.js';
import { connect } from 'react-redux';
import { getFinancialData } from '../../actions';

class GlobalGraphs extends Component{
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
        let ctx =document.getElementById('globalChart'); 
        let globalChart = new Chart (ctx, {
            type: 'bar',
            data: {
                labels:['Royalties Gross', 'Sales Agent Fee', "Distributor's Net"],
                datasets:[{
                    label: 'Global Consumer Products',
                    data: [
                        this.divisible(this.props.finance['royalties gross']),
                        this.divisible(this.props.finance['sales agent fee']),
                        this.divisible(this.props.finance["distributor's net"])
                    ],
                    borderColor: '#8e5ea2',
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.4)",
                        "rgba(54, 162, 235, 0.4)",
                        "rgba(255, 206, 86, 0.4)",
                        "rgba(75, 192, 192, 0.4)",
                        "rgba(153, 102, 255, 0.4)",
                        "rgba(255, 159, 64, 0.4)",
                        "rgba(255, 99, 132, 0.4)"
                      ],
                      borderColor: [
                        "rgb(255,99,132)",
                        "rgb(54, 162, 235)",
                        "rgb(255, 206, 86)",
                        "rgb(75, 192, 192)",
                        "rgb(153, 102, 255)",
                        "rgb(255, 159, 64)",
                        "rgb(255,99,132)"
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
        return  <canvas id='globalChart' width='200' height ='50'></canvas>;
    }
}

const mapStateToProps = state => {
    return {
        finance: state.finance.financeList[0]['global consumer products']
    }
}

export default connect(mapStateToProps, {
    getFinancialData
})(GlobalGraphs);
