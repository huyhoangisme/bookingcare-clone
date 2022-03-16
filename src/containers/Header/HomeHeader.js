import React from 'react'
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguage } from '../../store/actions'
class HomeHeader extends React.Component {

    handleChangeLanguage = (language) => {
        // GOI PROPs redux de thay doi ngon ngu
        this.props.changeLanguagueApp(language);
    }
    render() {
        return (
            <>
                <div className="homepage-header-container container">
                    <div className="header-content">
                        <div className="left-header">
                            <i className="fas fa-bars"></i>
                            <div className="image-logo"></div>
                        </div>
                        <div className="center-header d-none d-sm-none d-md-none d-lg-block d-lg-flex">
                            <div className="child">
                                <b className="text-child-title"> <FormattedMessage id="homeHeader.specialty" /></b>
                                <div className="text-child"> <FormattedMessage id="homeHeader.find-doctors" /></div>
                            </div>
                            <div className="child">
                                <b className="text-child-title"><FormattedMessage id="homeHeader.health-facilities" /></b>
                                <div className="text-child"><FormattedMessage id="homeHeader.choose-clinic" /></div>
                            </div>
                            <div className="child">
                                <b className="text-child-title"><FormattedMessage id="homeHeader.doctor" /></b>
                                <div className="text-child"><FormattedMessage id="homeHeader.choose-doctor" /></div>
                            </div>
                            <div className="child">
                                <b className="text-child-title"><FormattedMessage id="homeHeader.fee" /></b>
                                <div className="text-child"><FormattedMessage id="homeHeader.general-health" /></div>
                            </div>
                        </div>
                        <div className="right-header">
                            <i className="fas fa-question-circle"></i>
                            <span><FormattedMessage id="homeHeader.support" /></span>
                            <div className="language">
                                <span className={LANGUAGES.VI === this.props.language ? "language-vi active px-3" : "language-vi px-3"}>
                                    <span onClick={() => this.handleChangeLanguage(LANGUAGES.VI)}>VN</span>
                                </span>
                                <span className={LANGUAGES.EN === this.props.language ? "language-en active px-3" : "language-en"}>
                                    <span onClick={() => this.handleChangeLanguage(LANGUAGES.EN)}>EN</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguagueApp: (language) => dispatch(changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
