import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import './Login.scss';

class Login extends Component {
    // constructor(props) {
    //     super(props);
    //     this.btnLogin = React.createRef();
    // }
    state = {
        username: '',
        password: '',
        isShowPassword: false,
    }
    handleChangeUsername = (event) => {
        this.setState({
            username: event.target.value,
        })
    }
    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value
        })
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword,
        })
    }
    render() {

        return (
            <>
                <div className="login-background">
                    <div className="login-container">
                        <div className="login-content row">
                            <h2 className="col-12 login-text">Login</h2>
                            <div className=" col-12 form-group input-login">
                                <label className="text-label">Username</label>
                                <input type="text" className="form-control "
                                    placeholder="Enter your username"
                                    value={this.state.username} onChange={(event) => this.handleChangeUsername(event)}
                                />

                            </div>
                            <div className=" col-12 form-group input-login">
                                <label className="text-label">Password</label>
                                <div className="custom-input-password">
                                    <input type={this.state.isShowPassword ? 'text' : 'password'} className="form-control"
                                        placeholder="Enter your password"
                                        value={this.state.password} onChange={(event) => this.handleChangePassword(event)}
                                    />
                                    <i className={this.state.isShowPassword ? 'far fa-eye-slash' : 'far fa-eye'}
                                        onClick={() => this.handleShowHidePassword()}
                                    ></i>
                                </div>
                            </div>
                            <div className=" col-12 ">
                                <button className="btn-login input-login">Login</button>
                            </div>
                            <div className=" col-12 text-forgot">Forgot your password</div>
                            <div className="text-center mt-2 mb-2">Or login with:</div>
                            <div className="login-social">
                                <i className="fab fa-google-plus-g google"></i>
                                <i className="fab fa-facebook-f facebook"></i>
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
        lang: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
