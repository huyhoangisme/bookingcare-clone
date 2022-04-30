import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from '../../../store/actions'
import { ConnectedRouter as Router } from "connected-react-router";
import "./TimeScheduleDoctor.scss";
import Select from "react-select";
import localization from 'moment/locale/vi';
import { handleGetScheduleDoctor } from '../../../services/doctorService'
import { LANGUAGES } from "../../../utils/constant"
import moment from "moment";
import _ from 'lodash'
class TimeScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            optionDoctor: [],
            selectedDoctor: [],
            scheduleDoctor: []
        };
    }
    handleGetMomment = (language, result) => {
        if (language === LANGUAGES.EN) {
            for (let i = 0; i < 5; i++) {
                let object = {};
                if (i === 0) {
                    let today = moment(new Date()).locale('en').format('DD/MM');
                    object.label = `Today - ${today}`
                } else {
                    object.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                result.push(object);
            }
        }
        else if (language === LANGUAGES.VI) {
            for (let i = 0; i < 5; i++) {
                let object = {};
                if (i === 0) {
                    let today = moment(new Date()).format('DD/MM');
                    object.label = `Hôm nay - ${today}`
                } else {
                    object.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                }
                object.value = moment(new Date()).add(i, 'days').startOf('day').valueOf();
                result.push(object);
            }
            if (result && result.length > 0) {
                result = result.map((item) => {
                    if (item.label.includes('chủ nhật')) {
                        item.label = item.label.replace('chủ', 'Chủ')
                    }
                    item.label = item.label.replace('thứ', 'Thứ')
                    return item;
                })

            }
        }
        return result;
    }
    async componentDidMount() {
        let result = [];
        result = this.handleGetMomment(this.props.language, result);
        this.setState({ optionDoctor: result });
        this.props.getScheduleDoctor();
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            this.setState({ selectedOption: "" })
            let result = [];
            result = this.handleGetMomment(this.props.language, result);
            this.setState({ optionDoctor: result });
        }
        if (prevState.selectedOption.value !== this.state.selectedOption.value) {
            let selectedDoctor = await handleGetScheduleDoctor(this.props.doctorId, this.state.selectedOption.value);
            this.setState({ selectedDoctor: selectedDoctor.data });
        }
        if (prevProps.scheduleDoctor !== this.props.scheduleDoctor) {
            this.setState({ scheduleDoctor: this.props.scheduleDoctor })
        }
    }
    handleChangeSelect = (selectedOption) => {
        this.setState({ selectedOption });
    }
    handleLoadScheduleDoctor = (selectedDoctor, scheduleDoctor) => {
        let data = _.differenceWith(scheduleDoctor, selectedDoctor, (a, b) => {
            return a.keyMap === b.timeType;
        });
        return data;
    }
    render() {
        let scheduleLoadDynamics = this.handleLoadScheduleDoctor(this.state.selectedDoctor, this.state.scheduleDoctor);
        return (
            <div className=" time-schedule container">
                <div className="day-exam">
                    <Select
                        value={this.state.selectedOption}
                        onChange={this.handleChangeSelect}
                        options={this.state.optionDoctor}
                        className="react-select"
                    />
                </div>

                <div className="col-6 section-second">
                    <div className="title">
                        <i className="fas fa-calendar-alt"></i>
                        <h5>Lịch khám</h5>
                    </div>
                    <div className="time-work row">
                        {scheduleLoadDynamics && scheduleLoadDynamics.length > 0 &&
                            scheduleLoadDynamics.map((item, index) => {
                                return (
                                    <div className="col-3 selected-time" key={index}>
                                        <button className="col-12">{item.valueVi}</button>
                                    </div>
                                )
                            })

                        }
                    </div>
                </div>
            </div>
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
        getScheduleDoctor: () => dispatch(actions.fetchScheduleDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimeScheduleDoctor);
