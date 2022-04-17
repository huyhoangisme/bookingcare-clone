import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import HomeHeader from '../../../containers/Header/HomeHeader'
import './DetailDoctors.scss'
import { LANGUAGES } from '../../../utils'
import TimeScheduleDoctor from './TimeScheduleDoctor'
class DetailDoctors extends Component {
    constructor(props) {
        super(props)
        this.state = {
            detailDoctor: {}
        }
    }
    componentDidMount() {
        this.props.fetchDetailDoctor(this.props.match.params.id)
    }

    componentDidUpdate(prevProps, prevState) {

        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({
                detailDoctor: this.props.detailDoctor
            })
        }
    }
    render() {
        let { detailDoctor } = this.state;
        console.log("detail doctor", detailDoctor)
        let imageBase64 = "";
        if (detailDoctor.image) {
            imageBase64 = new Buffer(detailDoctor.image, 'base64').toString('binary');
        }
        let nameVi = '', nameEn = '';
        if (detailDoctor && detailDoctor.positionData) {
            nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName} ${detailDoctor.lastName}`;
            nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName} ${detailDoctor.firstName}`;
        }

        return (
            <>
                <HomeHeader />
                {detailDoctor && Object.keys(detailDoctor).length > 0 ?
                    <div className="container">
                        <div className="description-doctor">
                            <div className="height-image">
                                <div className="image-doctor"
                                    style={{ backgroundImage: `url(${imageBase64})` }}
                                ></div>
                            </div>
                            <div className="des">
                                <div className="name-doctor">
                                    <h3>{LANGUAGES.VI === this.props.language ? nameVi : nameEn}</h3>
                                </div>
                                {detailDoctor.Markdown.description}
                            </div>
                        </div>
                        <div className="schedule-doctor">
                            <div className="content-left">
                                <TimeScheduleDoctor
                                    doctorId={detailDoctor.id}
                                // date={ }
                                />
                            </div>
                            <div className="content-right">

                            </div>
                        </div>
                        <div className="intro-doctor">
                            <div className="content" dangerouslySetInnerHTML={{ __html: detailDoctor.Markdown.contentHtml }}></div>
                        </div>
                    </div>
                    :
                    <div>Thông tin bác sĩ chưa có</div>

                }

            </>
        )
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        detailDoctor: state.doctor.detailDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctors);
