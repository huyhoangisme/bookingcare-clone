import React, { Component } from 'react';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleGetAllUser, handleCreateUser, handleDeleteUser, handleUpdateUser } from '../../services/userService'
import ModalUser from './ModalUse';
import { emitter } from '../../utils/emitter';
import './userManage.scss'
class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Users: [],
            isTonggle: false,
            isCheckModal: false,
            idUser: 0,
        }
    }

    async componentDidMount() {
        await this.handleGetUserApi();
    }
    // api
    handleGetUserApi = async () => {
        let users = await handleGetAllUser('ALL');
        this.setState({ Users: users.data }, () => {
            console.log(users)
        });
    }
    handleCreateUsers = async (dataUser) => {
        try {
            // call api
            let response = await handleCreateUser(dataUser);
            if (response && response.errCode !== 0) {
                alert(response.errMessage);
            } else {
                await this.handleGetUserApi();
                this.setState({
                    isTonggle: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL');
            }
        } catch (err) {
            console.log(err);
        }

    }

    handleClickButtonAdd = () => {
        this.setState({
            isTonggle: true,
            isCheckModal: true,
        }, () => {
            emitter.emit('EVENT_CLEAR_MODAL');
        })


    }
    toggle = () => {
        this.setState({
            isTonggle: !this.state.isTonggle,
        })
    }
    handleDeleteUser = async (item) => {
        try {
            let res = await handleDeleteUser(item.id);
            if (res && res.errCode === 0) {
                this.handleGetUserApi();
            } else {
                alert(res.errMessage)
            }
        } catch (err) {
            console.log(err);
        }
    }
    handleUpdateUser = (item) => {

        this.setState({
            isTonggle: true,
            isCheckModal: false,
            idUser: item.id,
        }, () => {
            emitter.emit('UPDATE_DATA_A_USER', item);
        })

    }
    // xu li update user
    handleClickUpdateUser = async (item) => {
        item.id = this.state.idUser;
        try {
            let response = await handleUpdateUser(item);
            if (response && response.errCode != 0) {
                alert(response.errMessage);
            } else {
                await this.handleGetUserApi();
                this.setState({
                    isTonggle: false,
                })
                emitter.emit('EVENT_CLEAR_MODAL');
            }
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        let { Users } = this.state;
        return (
            <div className="users-container mx-2">
                <h3 className="text-center my-4">Manage users with Huy Hoang Handsome</h3>
                <button className="btn btn-primary px-2 my-2" onClick={() => this.handleClickButtonAdd()}>
                    <i className="fas fa-plus px-1"></i>
                    Add new user
                </button>
                <ModalUser
                    isTonggle={this.state.isTonggle}
                    toggle={this.toggle}
                    createUser={this.handleCreateUsers}
                    isCheckModal={this.state.isCheckModal}
                    updateUser={this.handleClickUpdateUser}
                />
                <table className="table-users">

                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Users && Users.length > 0 ?
                            Users.map((item, index) => {
                                return (
                                    <tr key={item.id} className="list-user">
                                        <td>{index + 1}</td>
                                        <td>{item.firstName} {item.lastName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.address}</td>
                                        <td>

                                            <button className="btn-edit"
                                                onClick={() => this.handleUpdateUser(item)}
                                            ><i className="fas fa-pencil-alt"></i></button>

                                            <button className="btn-delete"
                                                onClick={() => this.handleDeleteUser(item)}
                                            ><i className="fas fa-trash"></i></button>

                                        </td>
                                    </tr>
                                )
                            })
                            :
                            <div>
                                Chưa có người dùng nào!
                            </div>
                        }
                    </tbody>

                </table >
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
