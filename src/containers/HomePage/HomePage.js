import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HomeHeader from '../Header/HomeHeader';
import Banner from './Banner';
import Speciality from './Section/Speciality';
class HomePage extends Component {

    render() {
        return (
            <>
                <HomeHeader />
                <Banner />
                <Speciality />
                <div style={{ height: "200px" }}></div>
            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
