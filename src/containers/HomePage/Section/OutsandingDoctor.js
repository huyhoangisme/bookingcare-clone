import React from 'react'
import './OutsandingDoctor.scss';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { LANGUAGES } from '../../../utils'
import { withRouter } from 'react-router'
class OutsandingDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            windowWidth: window.innerWidth,
            topDoctors: [],
            isHeader: false,
        };
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                topDoctors: this.props.topDoctors
            })
        }
    }
    componentDidMount() {
        this.props.fetchTopDoctor(10);
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }
    handleRedrictPage = (item) => {
        this.setState({
            isHeader: true
        })
        this.props.history.push(`doctor/detail/${item.id}`);
    }
    render() {
        let { windowWidth } = this.state;
        let widthScreen = windowWidth > 576 ? 4 : 2;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: widthScreen,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 8000,
            pauseOnHover: true
        }
        let { topDoctors } = this.state;
        topDoctors = topDoctors.concat(topDoctors)
        return (
            <>
                <div div className="bg-outstanding-doctor" >
                    <div className="container-lg section-container">
                        <div className="section-header">
                            <h2 className="text-title">Bác sĩ nổi bật tuần qua</h2>
                            <button className="text-button">Tìm kiếm</button>
                        </div>
                        <div className="slider-content">
                            <Slider {...settings}>
                                {topDoctors && topDoctors.length > 0 &&
                                    topDoctors.map((item, index) => {
                                        let imageBase64 = "";
                                        if (item.image) {
                                            imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                        }
                                        let nameVi = `${item.positionData.valueVi}, ${item.firstName} ${item.lastName}`;
                                        let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                                        return (
                                            <div className="border-images" key={index}
                                                onClick={() => this.handleRedrictPage(item)}
                                            >
                                                <div className="slider-thumbnail">
                                                    <div className="image-doctor"
                                                        style={{ backgroundImage: `url(${imageBase64})` }}
                                                    ></div>
                                                    <h3 className="des-doctor">{LANGUAGES.VI === this.props.language ? nameVi : nameEn}</h3>
                                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                                </div>
                                            </div>

                                        )

                                    })
                                }

                            </Slider>
                        </div>
                    </div>
                </div >
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        topDoctors: state.doctor.topDoctor
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchTopDoctor: (limit) => dispatch(actions.fetchTopDoctorStart(limit))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(OutsandingDoctor));
