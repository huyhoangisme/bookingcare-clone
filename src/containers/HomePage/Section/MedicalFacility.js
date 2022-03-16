import React from 'react'
import './MedicalFacility.scss';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class MedicalFacility extends React.Component {
    constructor(props) {
        super(props);
        this.state = { windowWidth: window.innerWidth };
    }

    handleResize = (e) => {
        this.setState({ windowWidth: window.innerWidth });
    };

    componentDidMount() {
        window.addEventListener("resize", this.handleResize);
    }

    componentWillUnmount() {
        window.addEventListener("resize", this.handleResize);
    }
    render() {
        let { windowWidth } = this.state;
        let widthScreen = windowWidth > 768 ? 4 : 3;
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: widthScreen,
            slidesToScroll: 1
        }
        return (
            <div className="bg-medical-facility" >
                <div className="container-xl section-container">
                    <div className="section-header">
                        <h2 className="text-title">Cơ sở y tế nổi bật</h2>
                        <button className="text-button">Tìm kiếm</button>
                    </div>
                    <div className="slider-content">
                        <Slider {...settings}>
                            <div className="slider-thumbnail">
                                <div className="image">

                                </div>
                                <h3 className="text-content">Bệnh viện hữu nghị Việt Đức 1</h3>
                            </div>
                            <div className="slider-thumbnail">
                                <div className="image">

                                </div>
                                <h3 className="text-content">Bệnh viện hữu nghị Việt Đức 2</h3>
                            </div>
                            <div className="slider-thumbnail">
                                <div className="image">

                                </div>
                                <h3 className="text-content">Bệnh viện hữu nghị Việt Đức 3</h3>
                            </div>
                            <div className="slider-thumbnail">
                                <div className="image">

                                </div>
                                <h3 className="text-content">Bệnh viện hữu nghị Việt Đức 4</h3>
                            </div>
                            <div className="slider-thumbnail">
                                <div className="image">

                                </div>
                                <h3 className="text-content">Bệnh viện hữu nghị Việt Đức 5</h3>
                            </div>
                            <div className="slider-thumbnail">
                                <div className="image">

                                </div>
                                <h3 className="text-content">Bệnh viện hữu nghị Việt Đức 6</h3>
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
