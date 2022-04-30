import React from "react";
import "./Speciality.scss";
// import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from "react-redux";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Speciality extends React.Component {
    constructor(props) {
        super(props);
        this.state = { windowWidth: window.innerWidth, specialities: [] };
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    async componentDidMount() {
        window.addEventListener("resize", this.handleResize);
        await this.props.getSpecialties("ALL");
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.specialities !== this.props.specialities) {
            this.setState({
                specialities: this.props.specialities,
            });
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
        let { specialities } = this.state;
        return (
            <div className="bg-speciality">
                <div className="container-lg section-container">
                    <div className="section-header">
                        <h2 className="text-title">Chuyên khoa phổ biến</h2>
                        <button className="text-button">Xem thêm</button>
                    </div>
                    <div className="slider-content">
                        <Slider {...settings}>
                            {specialities && specialities.length > 0 &&
                                specialities.map((item, index) => {
                                    let imageBase64 = "";
                                    if (item.image) {
                                        imageBase64 = new Buffer(item.image, 'base64').toString('binary');
                                    }
                                    return (
                                        <div className="slider-thumbnail" key={index}>
                                            <div className="image" key={index}
                                                style={{ backgroundImage: `url(${imageBase64})` }}
                                            >
                                            </div>
                                            <h3 className="text-content">{item.name}</h3>
                                        </div>
                                    )
                                })
                            }

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
        specialities: state.clinic.specialities,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSpecialties: (data) => dispatch(actions.fetchSpecialityStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Speciality);
