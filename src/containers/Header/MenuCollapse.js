import React, { Component } from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import "./MenuCollapse.scss";
import { LANGUAGES } from "../../utils/constant";
import { FormattedMessage } from "react-intl";
import { Link, withRouter } from 'react-router-dom';
import onClickOutside from "react-onclickoutside";
class MenuCollapse extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    componentDidMount() {
        document.addEventListener('click', this.handleClickOutside, true);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.handleClickOutside, true);
    }

    componentDidUpdate() { }

    handleRedriectPage = (event, id) => {
        let data = event.target.getAttribute("data-in");
        this.props.history.push("/home");
    };

    handleClickOutside = (event) => {
        const domNode = ReactDOM.findDOMNode(this);
        if (!domNode || !domNode.contains(event.target)) {
            this.props.changeCollapse();
        }
    }

    // };
    render() {
        let collapse = this.props.collapse;
        return (
            <>
                {collapse ? (
                    <div className={collapse ? "collapse-container active" : "collapse-container"}>
                        <div className="bg-container">

                            <div className="first-section">
                                <div
                                    className="text-des"
                                    data-in="1"
                                    onClick={(event) => this.handleRedriectPage(event, "home")}
                                >
                                    Trang chủ
                                </div>
                                <div className="text-des">Cẩm nang</div>
                                <div className="text-des">Liên hệ hợp tác</div>
                            </div>
                            <div className="middle-section">Về bookingcare</div>
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
                    </div>

                ) : (
                    ""
                )}
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        // changeLanguagueApp: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MenuCollapse));
