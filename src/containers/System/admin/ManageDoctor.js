import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './ManageDoctor.scss';
import { toast } from 'react-toastify';
// import { handleGetAllCode } from '../../../services/userService';
import { handleDetailDoctor } from '../../../services/doctorService'
import * as actions from '../../../store/actions'
import Select from 'react-select';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { LANGUAGES, CRUD_ACTION } from '../../../utils/constant'
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
const mdParser = new MarkdownIt(/* Markdown-it options */);



class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            contentHTML: '',
            contentMarkdown: '',
            description: '',
            listDoctors: [],
            isHaveMarkdown: ''
        }
    }

    async componentDidMount() {
        this.props.getAllDoctorStart();
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let doctors = this.buildChooseSelectDoctor(this.props.allDoctors)
            this.setState({ listDoctors: doctors });
            // console.log("chek options", doctors)
        }
        if (prevProps.language !== this.props.language) {
            let doctors = this.buildChooseSelectDoctor(this.props.allDoctors)
            this.setState({
                selectedOption: null,
                listDoctors: doctors
            })
        }
    }

    buildChooseSelectDoctor = (data) => {
        if (data && data.length > 0) {
            let doctors = data.map((doctor) => {
                let selectDoctor = {};
                let valueVi = `${doctor.firstName} ${doctor.lastName}`;
                let valueEn = `${doctor.lastName} ${doctor.firstName}`;
                selectDoctor.label = (LANGUAGES.VI === this.props.language) ? valueVi : valueEn;
                selectDoctor.value = doctor.id;
                return (selectDoctor)
            })
            return doctors;
        }
        return [];
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text
        });
    }
    handleChangeSelect = async (selectedOption) => {
        this.setState({ selectedOption })
        let res = await handleDetailDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            if (!markdown.description) {
                markdown.description = ''
            }
            if (!markdown.contentMarkdown) {
                markdown.contentMarkdown = ''
            }
            if (!markdown.description && !markdown.contentMarkdown) {
                this.setState({
                    isHaveMarkdown: CRUD_ACTION.CREATE
                })
            } else {
                this.setState({
                    isHaveMarkdown: CRUD_ACTION.EDIT
                })
            }
            this.setState({
                contentHTML: markdown.contentHtml,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
            })
        } else {
            this.setState({
                contentHTML: '',
                contentMarkdown: '',
                description: '',
            })
        }

    };
    handleChangeTextArea = (event) => {
        this.setState({
            description: event.target.value
        })
    }

    handleClickBtnSave = () => {
        let stateCopy = this.state;
        console.log(stateCopy)
        this.props.createDetailDoctor({
            doctorId: stateCopy.selectedOption.value,
            description: stateCopy.description,
            contentHtml: stateCopy.contentHTML,
            contentMarkdown: stateCopy.contentMarkdown,
            isHaveMarkdown: stateCopy.isHaveMarkdown
        })
        toast.success("Tạo chi tiết bác sĩ thành công")
        this.setState({
            selectedOption: null,
            description: '',
            contentHTML: '',
            contentMarkdown: ''
        })
    }
    render() {
        return (
            <>
                <div className="doctors-container mx-2">
                    <div className="title">Quản lí bác sĩ</div>
                    <div className="content">
                        <div className="select-doctor">
                            <h4 >Tên bác sĩ</h4>
                            <Select
                                value={this.state.selectedOption}
                                onChange={this.handleChangeSelect}
                                // options={options}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className="more-info">
                            <h4 >Mô tả bác sĩ</h4>
                            <textarea rows="5"
                                onChange={(event) => this.handleChangeTextArea(event)}
                                value={this.state.description}
                            >
                                {this.state.description}
                            </textarea>
                        </div>
                    </div>
                    <MdEditor style={{ height: '500px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown} />
                    <div className=" btn btn-save px-3" onClick={(event) => this.handleClickBtnSave(event)}>
                        {this.state.isHaveMarkdown === CRUD_ACTION.EDIT ? 'Lưu thông tin' : 'Tạo thông tin'}
                    </div>
                </div >
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        allDoctors: state.doctor.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        createDetailDoctor: (data) => dispatch(actions.fetchCreateDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
