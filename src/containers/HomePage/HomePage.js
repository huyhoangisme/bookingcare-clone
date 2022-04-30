import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import HomeHeader from "../Header/HomeHeader";
import "./HomePage.scss";
import Banner from "./Banner";
import Speciality from "./Section/Speciality";
import MedicalFacility from "../HomePage/Section/MedicalFacility";
import OutsandingDoctor from "../HomePage/Section/OutsandingDoctor";
import Handbook from "./Section/Handbook";
import Footer from "../HomePage/Footer";

class HomePage extends Component {
    render() {
        return (
            <>
                <HomeHeader />
                <Banner />
                <Speciality />
                <MedicalFacility />
                <OutsandingDoctor />
                <Handbook />
                <Footer />

                <div style={{ height: "200px" }}></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
