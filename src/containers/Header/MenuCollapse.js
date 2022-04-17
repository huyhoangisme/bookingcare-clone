import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import './MenuCollapse.scss';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';

class MenuCollapse extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }

    }
    async componentDidMount() {

    }
    componentDidUpdate() {

    }


    render() {
        let id = this.props.id;
        return (
            <div id={id} className="collapse-container collapse show">
                <div className="first-section">
                    <div className="text-des">Trang chủ</div>
                    <div className="text-des">Cẩm nang</div>
                    <div className="text-des">Liên hệ hợp tác</div>
                </div>
                <div className='middle-section'>Về bookingcare</div>
                <div className="second-section">
                    <div className="text-des">Dành cho bệnh nhân</div>
                    <div className="text-des">Dành cho bác sĩ</div>
                    <div className="text-des">Liên hệ</div>
                    <div className="text-des">Câu hỏi thường gặp</div>
                    <div className="text-des">Điều khoản sử dụng</div>
                    <div className="text-des">Quy chế hoạt động</div>
                </div>
                <div className="social">
                    <i className="fab fa-facebook facebook"></i>
                    <i className="fab fa-google google"></i>
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

        // changeLanguagueApp: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuCollapse));
