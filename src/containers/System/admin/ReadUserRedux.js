import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ReadUserRedux.scss';
// import { handleGetAllCode } from '../../../services/userService';
import * as actions from '../../../store/actions'

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}


class ReadUserRedux extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    async componentDidMount() {
        await this.props.fetchAllUserStart();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.getAllUser !== this.props.getAllUser) {
            this.setState({ users: this.props.getAllUser })
        }
    }
    handleDeleteUser = async (user) => {
        await this.props.deleteUserStart(user.id);
        this.props.fetchAllUserStart();
    }
    handleUpdateUser = (user) => {
        // console.log("check user update", user)
        this.props.stateFromParent(user);
    }
    render() {
        let { users } = this.state;
        return (
            <>
                <div className="users-container mx-2">
                    <h3 className="text-center my-4">List user login success</h3>
                    <button className="btn btn-primary px-2 my-2">
                        <i className="fas fa-plus px-1"></i>
                        Add new user
                    </button>
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
                            {users && users.length > 0 &&
                                users.map((user, index) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.firstName} {user.lastName}</td>
                                            <td>{user.email} </td>
                                            <td>{user.address}</td>
                                            <td>
                                                <button className="btn-edit"
                                                    onClick={() => this.handleUpdateUser(user)}
                                                ><i className="fas fa-pencil-alt"></i></button>

                                                <button className="btn-delete"
                                                    onClick={() => this.handleDeleteUser(user)}
                                                ><i className="fas fa-trash"></i></button>

                                            </td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table >
                </div >
                <div style={{ height: '100px' }}></div>
                <div><h1>Markdown</h1></div>
                <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} />
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        getAllUser: state.admin.allUsers
    };
};

const mapDispatchToProps = dispatch => {
    return {
        // processLogout: () => dispatch(actions.processLogout()),
        // fetchGenderStart: () => dispatch(actions.fetchGenderStart()),
        fetchAllUserStart: () => dispatch(actions.fetchAllUserStart()),
        deleteUserStart: (id) => dispatch(actions.deleteUserStart(id))

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReadUserRedux);
