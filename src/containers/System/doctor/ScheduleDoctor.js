import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import './ScheduleDoctor.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../../utils/constant'
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import { toast } from 'react-toastify';
import { handleCreateScheduleDoctor } from '../../../services/doctorService'
class ScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            selectedOption: '',
            listDoctors: [],
            scheduleDoctor: [],
            currentNumber: 0 //so benh nhan trong 1 ngay
        }
    }
    async componentDidMount() {
        this.props.getAllDoctorStart();
        this.props.getScheduleDoctor();
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let doctors = this.buildChooseSelectDoctor(this.props.allDoctors)
            this.setState({ listDoctors: doctors });
            // console.log("chek options", doctors)
        }
        if (prevProps.scheduleDoctor !== this.props.scheduleDoctor) {
            let data = this.props.scheduleDoctor;
            if (data && data.length > 0) {
                data = data.map((item) => {
                    item.isSelected = false;
                    return item;
                })
            }
            this.setState({ scheduleDoctor: data });
        }
        if (prevProps.language !== this.props.language) {
            let doctors = this.buildChooseSelectDoctor(this.props.allDoctors)
            this.setState({
                selectedOption: null,
                listDoctors: doctors
            })
        }

    }
    buildChooseSelectDoctor = (data) => {
        if (data && data.length > 0) {
            let doctors = data.map((doctor) => {
                let selectDoctor = {};
                let valueVi = `${doctor.firstName} ${doctor.lastName}`;
                let valueEn = `${doctor.lastName} ${doctor.firstName}`;
                selectDoctor.label = (LANGUAGES.VI === this.props.language) ? valueVi : valueEn;
                selectDoctor.value = doctor.id;
                return (selectDoctor)
            })
            return doctors;
        }
        return [];
    }
    handleDateChange = (date) => {
        this.setState({ date: date })
        console.log("check date:", date);
    }
    handleDateSelect = (day) => {

    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })

    };
    handleClickBtnTime = (item) => {
        let copySchedule = this.state.scheduleDoctor;
        if (copySchedule && copySchedule.length > 0) {
            copySchedule = copySchedule.map((time) => {
                if (item.id === time.id) {
                    time.isSelected = !time.isSelected;
                }
                return time;
            })
        }
        this.setState({ scheduleDoctor: copySchedule });
    }
    handleClickBtnSave = () => {
        let formatDate = moment(this.state.date).startOf('day').valueOf();
        let selectedSchedule = {};
        let result = [];
        if (!this.state.selectedOption) {
            toast.error("Process create schedule failed");
            return;
        }
        let { scheduleDoctor } = this.state;
        if (scheduleDoctor && scheduleDoctor.length > 0) {
            selectedSchedule = scheduleDoctor.map((item) => {
                if (item.isSelected === true) {
                    selectedSchedule.date = formatDate;
                    selectedSchedule.doctorId = this.state.selectedOption.value;
                    selectedSchedule.timeType = item.keyMap;
                    result.push(selectedSchedule);
                    selectedSchedule = {};
                }
            })
        }
        handleCreateScheduleDoctor(result);
        toast.success("Process create schedule success");
    }
    render() {
        let { scheduleDoctor } = this.state;
        const language = this.props.language;
        return (
            <>
                <h2 className="title py-3"><FormattedMessage id="schedule.title" /></h2>
                <div className="select-doctor container row">
                    <div className="col-6 form-group ">
                        <label className="form-label">Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            // options={options}
                            options={this.state.listDoctors}
                        />
                        <div className="text-danger">
                            {this.state.selectedOption ? "" : "Trường này không được để trống!!!"}
                        </div>
                    </div>
                    <div className="col-6 form-group">
                        <label className="form-label">Chọn ngày</label>
                        <DatePicker
                            closeOnScroll={true}
                            selected={this.state.date}
                            onSelect={this.handleDateSelect} //when day is clicked
                            onChange={this.handleDateChange} //only when value has changed
                            className="form-control adjust-padding"
                            minDate={this.state.date}
                        />
                    </div>
                    <div className="schedule row">
                        {/* load theo api */}
                        <h3>Thời gian khám bệnh của bác sĩ</h3>
                        {scheduleDoctor && scheduleDoctor.length > 0 &&
                            scheduleDoctor.map((item, index) => {
                                return (
                                    <div className="py-2 col-2" key={index}
                                        onClick={() => this.handleClickBtnTime(item)}
                                    >
                                        <button className={language === LANGUAGES.VI ? item.isSelected ? "btn-schedule active col-8 " : "btn-schedule col-8 "
                                            : item.isSelected ? "btn-schedule active col-10 " : "btn-schedule col-10 "}>
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    </div>
                                )

                            })
                        }
                    </div>
                    <div className="save-info">
                        <button className="btn btn-success px-3" onClick={() => { this.handleClickBtnSave() }}>
                            {language === LANGUAGES.VI ? "Lưu thông tin" : "Save"}
                        </button>
                    </div>
                </div>
            </>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.doctor.allDoctors,
        scheduleDoctor: state.doctor.scheduleDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {

        getAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        getScheduleDoctor: () => dispatch(actions.fetchScheduleDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
