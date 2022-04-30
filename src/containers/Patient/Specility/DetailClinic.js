import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import { ConnectedRouter as Router } from "connected-react-router";
import "./DetailClinic.scss";
import Select from "react-select";

import { LANGUAGES } from "../../../utils/constant";

class DetailClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {

    }
    async componentDidUpdate(prevProps, prevState) {

    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
    }

    render() {

        return (
            <div>Huy Hoang</div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        scheduleDoctor: state.doctor.scheduleDoctor
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
