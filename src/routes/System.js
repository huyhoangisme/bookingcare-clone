import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import UserRedux from "../containers/System/admin/UserRedux";
import ManageDoctor from "../containers/System/admin/ManageDoctor";
import ManageDoctorSchedule from "../containers/System/doctor/ManageDoctorSchedule";
import ManageSpeciality from "../containers/System/admin/ManageSpeciality";
import CreateSpeciality from "../containers/System/admin/CreateSpeciality";
import CreateClinic from "../containers/System/admin/CreateClinic";
import ManageClinic from "../containers/System/admin/ManageClinic";
// import RegisterPackageGroupOrAcc from '../containers/System/RegisterPackageGroupOrAcc';
import Header from "../containers/Header/Header";
class System extends Component {
    render() {
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <>
                {isLoggedIn && <Header />}
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} exact />
                            <Route path="/system/user-redux" component={UserRedux} />
                            <Route path="/system/manage-doctor" component={ManageDoctor} />
                            <Route
                                path="/system/doctor/manage-doctor"
                                exact
                                component={ManageDoctorSchedule}
                            />
                            <Route
                                path="/system/specialty-manage"
                                component={ManageSpeciality}
                            />
                            <Route
                                path="/system/create-specialty"
                                component={CreateSpeciality}
                            />
                            <Route
                                path="/system/specialty-manage"
                                component={ManageSpeciality}
                            />
                            {/* clinic */}
                            <Route path="/system/create-clinic" component={CreateClinic} />
                            <Route path="/system/manage-clinic" component={ManageClinic} />
                            <Route
                                component={() => {
                                    return <Redirect to={systemMenuPath} />;
                                }}
                            />
                        </Switch>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
