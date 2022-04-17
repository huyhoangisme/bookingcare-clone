import React from 'react'
import { FormattedMessage } from 'react-intl';
import './HomeHeader.scss';
import { connect } from 'react-redux';
import * as actions from "../../store/actions";
import { Route, Switch } from 'react-router-dom';
import { LANGUAGES } from '../../utils/constant'
import { changeLanguage } from '../../store/actions'
import { withRouter } from 'react-router-dom';
import { path } from '../../utils'
import { emitter } from '../../utils/emitter'
import ScheduleDoctor from '../../containers/System/doctor/ManageDoctorSchedule';
import MenuCollapse from '../../containers/Header/MenuCollapse'
class HomeHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDropDown: false,
            roleID: 'R3',
            isCollapsed: false,
        }
        this.handleListenEvent()
    }
    handleListenEvent = () => {
        emitter.on('EVENT_CLOSE_COLLAPSE', () => {
            this.setState({ isCollapsed: false })
        })
    }
    componentDidMount() {
        // console.log("ahahhahahahha", this.props.userInfo)
    }
    componentDidUpdate(prevProps, prevState) {

        if (prevProps.userInfo && prevProps.userInfo.roleId) {
            if (prevProps.userInfo.roleId !== this.props.userInfo.roleId) {
                this.setState({
                    roleID: this.props.userInfo.roleId
                }, () => {
                    console.log("chage", this.state.roleID)
                })
            }
        }
    }
    // componentWillUnmount = () => {
    //     console.log("ahahhahahahha un mount", this.props.userInfo)
    // }
    handleChangeLanguage = (language) => {
        // GOI PROPs redux de thay doi ngon ngu
        this.props.changeLanguagueApp(language);
    }
    handleBackHomePage = () => {
        this.props.history.push('/home');
    }
    setIsShown = (event) => {
        this.setState({ roleID: this.props.userInfo.roleId });
        if (event === 'mouseEnter') {
            this.setState({ isDropDown: true });
        } else if (event === 'mouseMove') {
            this.setState({ isDropDown: false });
        }
    }
    handleLogOut = () => {
        this.props.processLogout();
        this.props.history.push('/login');
    }
    handleRedirectDashBoard = () => {
        let { roleID } = this.state;
        if (roleID && roleID === "R1") {
            this.props.history.push('/system/user-manage')
        } else if (roleID && roleID === "R2") {
            this.props.history.push('/system/doctor/manage-doctor')
        }
    }
    handleCollapse = () => {
        this.setState({ isCollapsed: true });
    }
    render() {
        let { roleID, isCollapsed } = this.state;

        // console.log('aaaks ka', roleID);
        // const { processLogout } = this.props;
        return (
            <>
                <div className="homepage-header-container container">
                    <div className="header-content">
                        <div className="left-header">
                            <i className="fas fa-bars" data-toggle="collapse" data-target="#collapse"
                                onClick={() => this.handleCollapse()}></i>
                            {isCollapsed ? <MenuCollapse id="collapse" /> : ''}
                            <div className="image-logo"
                                onClick={() => this.handleBackHomePage()}
                            ></div>
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
                            <div className="drop-down" >
                                <i className="fas fa-user-circle" onMouseEnter={() => this.setIsShown('mouseEnter')}></i>
                                <div className={this.state.isDropDown ? 'group-drop-down active' : 'group-drop-down'}
                                    onMouseLeave={() => this.setIsShown('mouseMove')}
                                >
                                    <div className="group-drop">
                                        <div className="account">Tài khoản</div>
                                        <div className={roleID && (roleID === 'R1' || roleID === 'R2') ? 'role' : 'role d-none'}
                                            onClick={() => this.handleRedirectDashBoard()}
                                        >
                                            {roleID && roleID === 'R1' ? 'Quản lí Admin' : roleID === 'R2' ? 'Quản lí bác sĩ' : ''}
                                        </div>
                                        <div className="logout" onClick={() => this.handleLogOut()}>Đăng xuất</div>
                                    </div>
                                </div>
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
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguagueApp: (language) => dispatch(changeLanguage(language)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
