import React from 'react';
import validator from 'validator';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { emitter } from '../../utils/emitter'
import { isBuffer } from 'lodash';
class ModalUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            address: '',
            arrErrors: {},
        }
        this.handleListenEvent()
    }
    handleListenEvent = () => {
        emitter.on('EVENT_CLEAR_MODAL', () => {
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                address: '',
                arrErrors: {},
            })
        })
        emitter.on('UPDATE_DATA_A_USER', (data) => {
            // console.log('OKK', data.data.firstName)
            this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                address: data.address,
                arrErrors: {},
            })
        })
    }
    toggle = () => {
        this.props.toggle();
    }
    handleChangeInput = (event, id) => {

        let copyState = { ...this.state };
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    validateForm = (data) => {
        const arrErrors = {};
        if (!data.firstName) {
            arrErrors['firstName'] = 'Vui lòng nhập trường này!';
        }
        if (!data.lastName) {
            arrErrors['lastName'] = 'Vui lòng nhập trường này!';
        }
        if (!data.email) {
            arrErrors['email'] = 'Vui lòng nhập trường này!';
        } else {
            let isEmail = validator.isEmail(data.email);
            if (!isEmail) {
                arrErrors['email'] = 'Trường này không phải email';
            }
        }
        if (!data.password && this.props.isCheckModal) {
            arrErrors['password'] = 'Vui lòng nhập trường này!';
        }
        if (!data.address) {
            arrErrors['address'] = 'Vui lòng nhập trường này!';
        }
        this.setState({
            arrErrors: arrErrors,
        })
        if (Object.keys(arrErrors).length === 0) {
            return false;
        } else return true;
    }
    handleClickBtnAddnew = async () => {
        const check = await this.validateForm(this.state);
        if (!check) {
            // call api 
            if (this.props.isCheckModal) {
                let data = { ...this.state };
                delete data.arrErrors;
                this.props.createUser(data);
            } else {
                let data = { ...this.state };
                delete data.arrErrors;
                this.props.updateUser(data);
            }
        }

    }
    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isTonggle}
                    size="lg"
                    centered
                    toggle={() => this.toggle()}

                >
                    <ModalHeader toggle={() => this.toggle()}>
                        {this.props.isCheckModal ? 'Create new user' : 'Edit a user'}
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-modal">
                            <div className="form-content my-2">
                                <div className="form-group">
                                    <div className="text-label">First name</div>
                                    <input type="text" placeholder="Nhập first name..."
                                        value={this.state.firstName}
                                        onChange={(event) => this.handleChangeInput(event, 'firstName')}
                                    />
                                    <div className="text-danger">
                                        {this.state.arrErrors['firstName'] ? this.state.arrErrors['firstName'] : ''}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="text-label">Last name</div>
                                    <input type="text" placeholder="Nhập last name..."
                                        value={this.state.lastName}
                                        onChange={(event) => this.handleChangeInput(event, 'lastName')}
                                    />
                                    <div className="text-danger">
                                        {this.state.arrErrors['lastName'] ? this.state.arrErrors['lastName'] : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="form-content my-2">
                                <div className="form-group">
                                    <div className="text-label">Email</div>
                                    <input type="text" placeholder="Nhập email..."
                                        value={this.state.email}
                                        disabled={this.props.isCheckModal ? '' : 'disabled'}
                                        onChange={(event) => this.handleChangeInput(event, 'email')}
                                    />
                                    <div className="text-danger">
                                        {this.state.arrErrors['email'] ? this.state.arrErrors['email'] : ''}
                                    </div>
                                </div>
                                <div className="form-group" hidden={this.props.isCheckModal ? '' : 'true'}>
                                    <div className="text-label">Password</div>
                                    <input type="password" placeholder="Nhập password..."
                                        value={this.state.password}
                                        disabled={this.props.isCheckModal ? '' : 'disabled'}

                                        onChange={(event) => this.handleChangeInput(event, 'password')}
                                    />
                                    <div className="text-danger">
                                        {this.state.arrErrors['password'] ? this.state.arrErrors['password'] : ''}
                                    </div>
                                </div>
                            </div>
                            <div className="form-content my-2">
                                <div className="form-group">
                                    <div className="text-label">Address</div>
                                    <input type="text" placeholder="Nhập address..."
                                        value={this.state.address}
                                        onChange={(event) => this.handleChangeInput(event, 'address')}
                                    />
                                    <div className="text-danger">
                                        {this.state.arrErrors['address'] ? this.state.arrErrors['address'] : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button
                            className="btn btn-primary px-3"
                            color="primary"
                            onClick={() => this.handleClickBtnAddnew()}
                        >
                            {this.props.isCheckModal ? 'Add new' : 'Save'}
                        </button>
                        {' '}
                        <button
                            className="btn btn-secondary px-2"
                            onClick={() => this.toggle()}>
                            Cancel
                        </button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}
export default ModalUser;