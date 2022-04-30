import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./MedicalExamInfo.scss";
import { handleGetSpecialityClinicByID } from "../../../services/doctorService";
import CommonUtils from "../../../utils/CommonUtils";
import _ from "lodash";
class MedicalExamInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowHide: true,
            listDoctorInfo: {},
        };
    }

    async componentDidMount() {
        let listDoctorInfo = await handleGetSpecialityClinicByID(
            this.props.doctorId
        );
        this.setState({
            listDoctorInfo: listDoctorInfo.data,
        });
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
        }
    }
    handleShowHide = (condition) => {
        this.setState({ isShowHide: condition });
    };
    render() {
        let { isShowHide, listDoctorInfo } = this.state;
        return (
            <div className="medical-exam-info-container">
                <div className="section-address">
                    <b className="medical-title">ĐỊA CHỈ KHÁM</b>
                    <div className="name-clinic">
                        {listDoctorInfo && listDoctorInfo.Clinic
                            ? listDoctorInfo.Clinic.name
                            : ""}
                    </div>
                    <div className="address-clinic">
                        {listDoctorInfo && listDoctorInfo.Clinic
                            ? listDoctorInfo.Clinic.address
                            : ""}
                    </div>
                </div>
                {isShowHide === false ? (
                    <div className="section-price">
                        <b className="medical-title">giá KHÁM:</b>
                        <span className="text-price">
                            {listDoctorInfo && listDoctorInfo.priceData
                                ? `${CommonUtils.formatNumber(
                                    listDoctorInfo.priceData.valueVi
                                )}đ.`
                                : ""}
                        </span>
                        <span
                            className="text-show"
                            onClick={() => this.handleShowHide(true)}
                        >
                            Xem chi tiết
                        </span>
                    </div>
                ) : (
                    <div className="section-price">
                        <b className="medical-title">giá KHÁM:</b>
                        <div className="medical-price">
                            <div className="table-price">
                                <div className="first">
                                    <div className="first-title">
                                        Giá khám
                                        <p>
                                            {`Được ưu tiên khám trước khi đặt khám qua BookingCare. Giá
                                            khám cho người nước ngoài là ${listDoctorInfo &&
                                                    listDoctorInfo.priceData
                                                    ? listDoctorInfo.priceData
                                                        .valueEn
                                                    : ""
                                                } USD`}
                                        </p>
                                    </div>
                                    <div className="price">
                                        {listDoctorInfo && listDoctorInfo.priceData
                                            ? `${CommonUtils.formatNumber(
                                                listDoctorInfo.priceData.valueVi
                                            )}đ`
                                            : ""}
                                    </div>
                                </div>
                                <div className="second">
                                    {`Người bệnh có thể thanh toán chi phí bằng hình thức ${listDoctorInfo && listDoctorInfo.paymentData
                                        ? listDoctorInfo.paymentData.valueVi
                                        : ""
                                        }`}
                                </div>
                            </div>
                            <div className="text" onClick={() => this.handleShowHide(false)}>
                                Ẩn bảng giá
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getScheduleDoctor: () => dispatch(actions.fetchScheduleDoctorStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalExamInfo);
