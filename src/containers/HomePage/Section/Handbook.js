import React from 'react'
import './Handbook.scss';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class Handbook extends React.Component {
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
        let widthScreen = windowWidth > 576 ? 2 : 1.5;
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: widthScreen,
            slidesToScroll: 1
        }
        return (
            <div className="bg-handbook" >
                <div className="container-lg section-container">
                    <div className="section-header">
                        <h2 className="text-title">Cẩm nang</h2>
                        <button className="text-button">Tất cả bài viết</button>
                    </div>
                    <div className="slider-content">
                        <Slider {...settings}>

                            <div className="slider-thumbnail slider-handbook">
                                <div className="image">

                                </div>
                                <h3 className="text-content ps-3">5 Địa chỉ khám bệnh Tai Mũi Họng uy tín tại quận 10, TP.HCM</h3>

                            </div>
                            <div className="slider-thumbnail slider-handbook">
                                <div className="image">

                                </div>
                                <h3 className="text-content ps-3">5 Địa chỉ khám bệnh Tai Mũi Họng uy tín tại quận 10, TP.HCM</h3>
                            </div>
                            <div className="slider-thumbnail slider-handbook">
                                <div className="image">

                                </div>
                                <h3 className="text-content ps-3">5 Địa chỉ khám bệnh Tai Mũi Họng uy tín tại quận 10, TP.HCM</h3>
                            </div>
                            <div className="slider-thumbnail slider-handbook">
                                <div className="image">

                                </div>
                                <h3 className="text-content ps-3">5 Địa chỉ khám bệnh Tai Mũi Họng uy tín tại quận 10, TP.HCM</h3>
                            </div>
                            <div className="slider-thumbnail slider-handbook">
                                <div className="image">

                                </div>
                                <h3 className="text-content ps-3">5 Địa chỉ khám bệnh Tai Mũi Họng uy tín tại quận 10, TP.HCM</h3>
                            </div>
                            <div className="slider-thumbnail slider-handbook">
                                <div className="image">

                                </div>
                                <h3 className="text-content ps-3">5 Địa chỉ khám bệnh Tai Mũi Họng uy tín tại quận 10, TP.HCM</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Handbook);
