import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../../../redux'
import { path } from '../../../utils/constant'
import CustomScrollbars from '../../../components/CustomScrollbars'
import ScheduleDoctor from './ScheduleDoctor'
class ManageDoctorSchedule extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <span className="content-container">
                            <CustomScrollbars style={{ height: "100vh", width: "100%" }}>
                                <Switch>
                                    <Route path={path.MANAGE_DOCTOR} exact component={(ScheduleDoctor)} />
                                </Switch>
                            </CustomScrollbars>
                        </span>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                    </div>
                </Router>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctorSchedule);