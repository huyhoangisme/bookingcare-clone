import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';
import { LANGUAGES } from '../../utils/constant'
import { FormattedMessage } from 'react-intl';
class Header extends Component {
    handleOnClickBtn = (language) => {
        // call redux for change language
        this.props.changeLanguagueApp(language)
    }
    render() {
        const { processLogout, userInfo } = this.props;
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                {/* nút logout */}
                <div>
                    <FormattedMessage id="header.welcome" />
                    {userInfo && userInfo.firstName ? userInfo.firstName : ''}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
