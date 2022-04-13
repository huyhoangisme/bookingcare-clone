import React from 'react'
import './Footer.scss';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class Footer extends React.Component {
    render() {
        return (
            <footer className="bg-footer">
                <div className="bg-container container row d-flex">
                    <div className="footer-first col-xs-12 col-md-5">
                        <div className="logo">

                        </div>
                        <div className="address">
                            <p>Công ty Cổ phần Công nghệ BookingCare</p>
                            <div className="map">
                                <i className="fas fa-map-marker-alt"></i>
                                <span>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</span>
                            </div>
                            <div className="map">
                                <i className="fas fa-check"></i>
                                <span>ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</span>
                            </div>

                        </div>
                    </div>
                    <div className="footer-second col-sx-12 col-md-3">
                        <div className="vung-bao"><a className="child">Liên hệ hợp tác</a></div>
                        <div className="vung-bao"><a className="child">Câu hỏi thường gặp</a></div>
                        <div className="vung-bao"><a className="child">Điều khoản sử dụng</a></div>
                        <div className="vung-bao"><a className="child">Chính sách bảo mật</a></div>
                        <div className="vung-bao"><a className="child">Quy trình hỗ trợ và giải quyết khiếu nại</a></div>
                        <div className="vung-bao"><a className="child">Quy chế hoạt động</a></div>
                    </div>
                    <div className="footer-third col-xs-12 col-sm-4">
                        <div className="info">
                            <div>Trụ sở tại Hà Nội</div>
                            <div className="info-address"></div>
                            28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
                        </div>
                        <div className="info">
                            <div>Văn phòng tại TP Hồ Chí Minh</div>
                            <div className="info-address"></div>
                            6/6 Cách Mạch Tháng Tám, P. Bến Thành, Quận 1
                        </div>
                        <div className="info">
                            <div>Hỗ trợ khách hàng</div>
                            <div className="info-address"></div>
                            support@bookingcare.vn (7h30 - 18h)
                        </div>
                    </div>
                </div>
            </footer>
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

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
