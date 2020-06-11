import React, { Component } from 'react';
import { Link, Redirect, withRouter } from 'react-router-dom';
import logo from '../../assets/images/ftf_logo_150.png';
import { connect } from 'react-redux';
import { signIn, signOut, toggleNavbar } from '../../actions';

class Nav extends Component{
    state = {
        topLinks: [
            {
                text: 'New Project',
                to:'/new_project'
            }
        ],
        loggedInLinks: [
            {
                text: 'My Projects',
                to:'/my_projects'
            }
        ],
        bottomLinks: [
            {
                text: 'Contact',
                to:'/contact'
            }, 
            {
                text: 'About Us',
                to:'/about'
            },
            {
                text:'Terms & Conditions',
                to:'/terms_and_conditions'
            }
        ],
        signIn: [
            {
                text: 'Sign In',
                to:'/sign_in'
            }
        ]
    }

    toggleClass = () => {
        const currentState = this.props.toggle;
        this.props.toggleNavbar(!currentState);
    }

    hideNavbar = () => {
        this.props.toggleNavbar(false);
    }

    logout = () => {
        this.props.signOut();
        // this.props.register(true);
        this.props.history.push('/');
    }

    buildLink(link){
        return (
            <Link to= { link.to} key= { link.to } >
                <li>
                    { link.text }
                </li>
                <hr />
            </Link>
        )
    }

    renderLinks(){
        const login = this.props.sign_in.login;
        const {topLinks, loggedInLinks, bottomLinks, signIn} = this.state;

        let activeLinks = [];
        let linkElements = [];

        if(login){
            activeLinks = [...topLinks, ...loggedInLinks, ...bottomLinks];

            linkElements = activeLinks.map(this.buildLink);

            linkElements.push(
                <li key='/sign_out' onClick={this.logout} className='signout-button'>
                  Sign Out      
                </li>
            );
        } else {
            activeLinks = [...topLinks, ...bottomLinks, ...signIn];

            linkElements = activeLinks.map(this.buildLink)
        }

        return linkElements;
    }

    render(){
        const hamburgerBaseClass = 'hamburger hamburger--spin ';
        const hamburgerActive = 'is-active';
        const login = this.props.sign_in.login;

        return(
            <div className='nav-bar-container'>
                <div className='nav-bar'>
                    <button onClick= { this.toggleClass } className= { this.props.toggle ? (hamburgerBaseClass + hamburgerActive):hamburgerBaseClass } type='button'>
                        <span className='hamburger-box'>
                            <span className='hamburger-inner'></span>
                        </span>
                    </button>
                </div>
                <div id='slide-out-menu' className = {this.props.toggle ? 'active' : '' }>
                    <button onClick= { this.hideNavbar } className= { this.props.toggle ? (hamburgerBaseClass + hamburgerActive):hamburgerBaseClass } type='button'>
                        <span className='hamburger-box'>
                            <span className='hamburger-inner'></span>
                        </span>
                    </button>
                    <div className='login-img-container'>
                        <Link to='/'>
                            <img className='login-img' src= { logo }/>
                        </Link>
                    </div>
                    <div className='welcome-login-header'>
                        <h2>FUND THAT FILM</h2>
                    </div>
                    <div className='slide-out-menu-content-container'>
                        <div className='slide-out-menu-content'>
                            <hr className='main-hr'/>
                            { this.renderLinks() }
                        </div>
                    </div>
                </div>
           </div>
        )
    }
  }

const mapStateToProps = state => {
  return {
    sign_in: state.session,
    sign_out: state.session.login,
    // register: state.session.register,
    toggle: state.navbar.active,
    scroll: state.scrollable.scrollable
  }
}

export default withRouter(connect(mapStateToProps, { 
    signIn, 
    signOut, 
    // register, 
    toggleNavbar
})(Nav)); 
