import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ScheduleDoctor.scss';
import { FormattedMessage } from 'react-intl';
class ScheduleDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    async componentDidMount() {

    }
    render() {

        return (
            <div>Quản lí lịch khám bác sĩ</div>
        );
    }

}

const mapStateToProps = state => {
    return {
        // isLoggedIn: state.user.isLoggedIn,
        // language: state.app.language,
        // userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // changeLanguagueApp: (language) => dispatch(actions.changeLanguage(language)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleDoctor);
