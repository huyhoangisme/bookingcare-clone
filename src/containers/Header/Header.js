import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu, doctorMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userPartition: ''
        }
    }
    async componentDidMount() {
        let userInfo = this.props.userInfo;
        if (userInfo && userInfo.roleId) {
            if (userInfo.roleId === 'R2') {
                this.setState({
                    userPartition: 'R2'
                })
            } else if (userInfo.roleId === 'R1') {
                this.setState({
                    userPartition: 'R1'
                })
            } else {
                this.setState({
                    userPartition: 'R3'
                })
            }
        }
    }
    handleOnClickBtn = (language) => {
        // call redux for change language
        this.props.changeLanguagueApp(language)
    }
    handleRedirectHomePage = () => {
        this.props.history.push("/home")
    }
    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                {/* <FormattedMessage id="menu.dashboard.home" /> */}
                <div className="header-home" onClick={() => this.handleRedirectHomePage()}><i className="fas fa-home"></i></div>
                <div className="header-tabs-container">
                    <Navigator menus={this.state.userPartition === "R1" ? adminMenu : doctorMenu} />
                </div>

                {/* nút logout */}
                <div>
                    <FormattedMessage id="header.welcome" />
                    {userInfo && userInfo.lastName ? userInfo.lastName : ''}
                </div>
                <div className="language">
                    <span className={LANGUAGES.VI === this.props.language ? "language-vi active" : "language-vi"} onClick={() => this.handleOnClickBtn(LANGUAGES.VI)}>VN</span>
                    <span className={LANGUAGES.EN === this.props.language ? "language-en active" : "language-en"} onClick={() => this.handleOnClickBtn(LANGUAGES.EN)}>EN</span>
                </div>
                <div className="btn btn-logout" onClick={processLogout} title="Log out">

                    <i className="fas fa-sign-out-alt"></i>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguagueApp: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
