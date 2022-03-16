import React from 'react'
import './OutsandingDoctor.scss';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutsandingDoctor extends React.Component {
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
        let widthScreen = windowWidth > 576 ? 4 : 2;
        let settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: widthScreen,
            slidesToScroll: 1
        }
        return (
            <div className="bg-outstanding-doctor" >
                <div className="container-xl section-container">
                    <div className="section-header">
                        <h2 className="text-title">Bác sĩ nổi bật tuần qua</h2>
                        <button className="text-button">Tìm kiếm</button>
                    </div>
                    <div className="slider-content">
                        <Slider {...settings}>
                            <div className="border-images">
                                <div className="slider-thumbnail">
                                    <div className="image-doctor">

                                    </div>
                                    <h3 className="des-doctor">Bệnh viện hữu nghị Việt Đức 1</h3>
                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                </div>
                            </div>
                            <div className="border-images">
                                <div className="slider-thumbnail">
                                    <div className="image-doctor">

                                    </div>
                                    <h3 className="des-doctor">Bệnh viện hữu nghị Việt Đức 1</h3>
                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                </div>
                            </div>
                            <div className="border-images">
                                <div className="slider-thumbnail">
                                    <div className="image-doctor">

                                    </div>
                                    <h3 className="des-doctor">Bệnh viện hữu nghị Việt Đức 1</h3>
                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                </div>
                            </div>
                            <div className="border-images">
                                <div className="slider-thumbnail">
                                    <div className="image-doctor">

                                    </div>
                                    <h3 className="des-doctor">Bệnh viện hữu nghị Việt Đức 1</h3>
                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                </div>
                            </div>
                            <div className="border-images">
                                <div className="slider-thumbnail">
                                    <div className="image-doctor">

                                    </div>
                                    <h3 className="des-doctor">Bệnh viện hữu nghị Việt Đức 1</h3>
                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                </div>
                            </div>
                            <div className="border-images">
                                <div className="slider-thumbnail">
                                    <div className="image-doctor">

                                    </div>
                                    <h3 className="des-doctor">Bệnh viện hữu nghị Việt Đức 1</h3>
                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                </div>
                            </div>
                            <div className="border-images">
                                <div className="slider-thumbnail">
                                    <div className="image-doctor">

                                    </div>
                                    <h3 className="des-doctor">Bệnh viện hữu nghị Việt Đức 1</h3>
                                    <h3 className="text-content text-speciality">Da liễu</h3>
                                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutsandingDoctor);
