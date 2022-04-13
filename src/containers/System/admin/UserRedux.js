import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserRedux.scss';
import { CRUD_ACTION } from '../../../utils/constant'
import { CommonUtils } from '../../../utils'
// import { handleGetAllCode } from '../../../services/userService';
import * as actions from '../../../store/actions'
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app
import ReadUserRedux from './ReadUserRedux'
class UserRedux extends Component {

    state = {
        arrGenders: [],
        arrRoles: [],
        arrPositions: [],
        previewImgUrl: '',
        isOpen: false,
        // state cho create user
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        address: '',
        phoneNumber: '',
        avatar: '',
        gender: '',
        position: '',
        roleId: '',
        action: CRUD_ACTION.CREATE,
        id: ''
    }

    async componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchRoleStart();
        this.props.fetchPositionStart();
        // try {
        //     let res = await handleGetAllCode('gender');
        //     console.log("check debug", res.data)
        //     if (res && res.data.length > 0) {
        //         this.setState({
        //             arrGenders: res.data
        //         })
        //     }
        // } catch (err) {
        //     console.error(err);
        // }

    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            let genders = this.props.genders
            this.setState({
                arrGenders: this.props.genders,
                gender: genders && genders.length > 0 ? genders[0].keyMap : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            let roles = this.props.roles
            this.setState({
                arrRoles: this.props.roles,
                roleId: roles && roles.length > 0 ? roles[0].keyMap : ''
            })
        }
        if (prevProps.positions !== this.props.positions) {
            let positions = this.props.positions
            this.setState({
                arrPositions: this.props.positions,
                position: positions && positions.length > 0 ? positions[0].keyMap : ''
            })
        }
    }

    handleGetImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.convertBase64(file);
            let objectImg = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectImg,
                avatar: base64
            });
        }
    }
    handleClickImage = () => {
        if (!this.state.previewImgUrl) return;
        else {
        } this.setState({
            isOpen: true
        })

    }
    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    validateForm = () => {
        // chua lam
    }
    handleCreateNewUser = async (event) => {
        if (this.state.action === CRUD_ACTION.CREATE) {
            // xu li validate
            await this.props.fetchCreateNewUser({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                address: this.state.address,
                phone: this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.roleId,
                avatar: this.state.avatar,
                position: this.state.position
            })

        }
        else if (this.state.action === CRUD_ACTION.EDIT) {
            await this.props.fetchUpdateUserStart({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber,
                avatar: this.state.avatar,
                gender: this.state.gender,
                position: this.state.position,
                roleId: this.state.roleId,
                id: this.state.id,
            })
        }
        this.setState({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            phoneNumber: '',
            avatar: '',
            gender: '',
            position: '',
            roleId: '',
            // avatar: '',
            previewImgUrl: ''
        })
        this.props.fetchAllUserStart();
    }
    handleEditUser = (user) => {
        let imageBase64 = '';
        if (user.image) {
            imageBase64 = new Buffer(user.image, 'base64').toString('binary');
        }
        this.setState({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            position: user.positionId,
            roleId: user.roleId,
            action: CRUD_ACTION.EDIT,
            id: user.id,
            previewImgUrl: imageBase64
        })
    }
    render() {
        let genders = this.state.arrGenders;
        let roles = this.state.arrRoles;
        let positions = this.state.arrPositions;
        let { firstName, lastName, email, password, address, phoneNumber, gender, position, roleId } = this.state;
        return (
            <>
                <div className="container-fluid form-container">
                    <div className="title">Learn redux with Huy Hoang Handsome</div>
                    <div>{this.props.isLoading ? 'Loading data' : ''}</div>
                    <div className="form-group row py-2">
                        <div className="col-6">
                            <label className="form-label"><FormattedMessage id="form.firstname" /></label>
                            <input className="form-control" type="text" placeholder="Nhập họ của bạn..."
                                value={firstName}
                                onChange={(event) => this.handleOnChangeInput(event, 'firstName')}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label"><FormattedMessage id="form.lastname" /></label>
                            <input className="form-control" type="text" placeholder="Nhập tên của bạn..."
                                value={lastName}
                                onChange={(event) => this.handleOnChangeInput(event, 'lastName')}
                            />
                        </div>
                    </div>
                    <div className="form-group row py-2">
                        <div className="col-6">
                            <label className="form-label"><FormattedMessage id="form.email" /></label>
                            <input className="form-control" type="text" placeholder="Nhập email của bạn..."
                                value={email}
                                onChange={(event) => this.handleOnChangeInput(event, 'email')}
                                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label"><FormattedMessage id="form.password" /></label>
                            <input className="form-control" type="text" placeholder="Nhập mật khẩu của bạn..."
                                value={password}
                                onChange={(event) => this.handleOnChangeInput(event, 'password')}
                                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                            />
                        </div>
                    </div>
                    <div className="form-group row py-2">
                        <div className="col-12">
                            <label className="form-label"><FormattedMessage id="form.address" /></label>
                            <input className="form-control" type="text" placeholder="Nhập địa chỉ của bạn..."
                                value={address}
                                onChange={(event) => this.handleOnChangeInput(event, 'address')}
                            />
                        </div>
                    </div>
                    <div className="form-group row py-2">
                        <div className="col-6">
                            <label className="form-label"><FormattedMessage id="form.phone" /></label>
                            <input className="form-control" type="text" placeholder="Nhập số điện thoại của bạn..."
                                value={phoneNumber}
                                onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                            />
                        </div>
                        <div className="col-6">
                            <label className="form-label"><FormattedMessage id="form.image" /></label>
                            <div className='image-preview-container'>
                                <label className="image-upload" htmlFor="image-preview">Tải ảnh <i className="fas fa-upload"></i></label>
                                <input className="form-control" id="image-preview" type="file" hidden
                                    onChange={(event) => this.handleGetImage(event)}

                                />
                                <div className="preview-image"
                                    style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                    onClick={() => this.handleClickImage()}
                                >
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group row py-2">
                        <div className="col-6">
                            <label className="form-label"><FormattedMessage id="form.gender" /></label>
                            <select className="form-select"
                                onChange={(event) => this.handleOnChangeInput(event, 'gender')}
                                value={gender}
                            >
                                {genders && genders.length > 0 &&
                                    genders.map((gender, index) => {
                                        return (
                                            <option key={index + 1} value={gender.keyMap} >
                                                {this.props.language === 'en' ? gender.valueEn : gender.valueVi}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-4">
                            <label className="form-label"><FormattedMessage id="form.position" /></label>
                            <select className="form-select"
                                onChange={(event) => this.handleOnChangeInput(event, 'position')}
                                value={position}
                            >
                                {positions && positions.length > 0 &&
                                    positions.map((position, index) => {
                                        return (
                                            <option key={index + 1} value={position.keyMap} >
                                                {this.props.language === 'en' ? position.valueEn : position.valueVi}
                                            </option>
                                        )
                                    })

                                }
                            </select>
                        </div>
                        <div className="col-2">
                            <label className="form-label"><FormattedMessage id="form.roleId" /></label>
                            <select className="form-select"
                                onChange={(event) => this.handleOnChangeInput(event, 'roleId')}
                                value={roleId}
                            >
                                {roles && roles.length > 0 &&
                                    roles.map((role, index) => {
                                        return (
                                            <option key={index + 1} value={role.keyMap} >
                                                {this.props.language === 'en' ? role.valueEn : role.valueVi}
                                            </option>
                                        )
                                    })

                                }
                            </select>
                        </div>
                    </div>
                    {this.state.isOpen === true &&
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    }
                    <button className={this.state.action === CRUD_ACTION.EDIT ? 'btn btn-primary px-3 mt-4' : 'btn btn-secondary px-3 mt-4'}
                        style={{ outline: 'none' }}
                        onClick={(event) => this.handleCreateNewUser(event)}
                    >
                        {this.state.action === CRUD_ACTION.EDIT ? "Save Changes" : "Create User"}
                    </button>
                </div >
                <ReadUserRedux
                    stateFromParent={this.handleEditUser}
                    action={this.state.action}
                />
                <div style={{ height: '30px' }}></div>
            </>
        )

    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        isLoading: state.admin.isLoading,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchRoleStart: () => dispatch(actions.fetchRoleStart()),
        fetchPositionStart: () => dispatch(actions.fetchPositionStart()),
        fetchCreateNewUser: (data) => dispatch(actions.fetchCreateNewUserStart(data)),
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        fetchUpdateUserStart: (data) => dispatch(actions.updateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
