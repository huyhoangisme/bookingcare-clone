import React from "react";
import "./MedicalFacility.scss";
// import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends React.Component {
    constructor(props) {
        super(props);
        this.state = { windowWidth: window.innerWidth, clinics: [] };
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    async componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        await this.props.getClinics("ALL");
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.clinics !== this.props.clinics) {
            this.setState({ clinics: this.props.clinics });
        }
    }
    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }
    render() {
        let { windowWidth } = this.state;
        let widthScreen = windowWidth > 768 ? 4 : 2.5;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: widthScreen,
            slidesToScroll: 1,
        };
        let { clinics } = this.state;
        return (
            <div className="bg-medical-facility">
                <div className="container-lg section-container">
                    <div className="section-header">
                        <h2 className="text-title">Cơ sở y tế nổi bật</h2>
                        <button className="text-button">Tìm kiếm</button>
                    </div>
                    <div className="slider-content">
                        <Slider {...settings}>
                            {clinics &&
                                clinics.length > 0 &&
                                clinics.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, "base64").toString("binary");
                                    }
                                    return (
                                        <div className="slider-thumbnail" key={index}>
                                            <div
                                                className="image"
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            ></div>
                                            <h3 className="text-content">{item.name}</h3>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language,
        clinics: state.clinic.clinics,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getClinics: (data) => dispatch(actions.fetchClinicStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
