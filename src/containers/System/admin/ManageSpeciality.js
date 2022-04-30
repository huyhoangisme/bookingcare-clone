import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import Select from "react-select";
import "./ManageSpeciality.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import {
    handleGetSpeciality,
    handleUpdateSpeciality,
} from "../../../services/doctorService";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { toast } from "react-toastify";
import { CRUD_ACTION } from "../../../utils/constant";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpeciality extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: "",
            options: [],
            specialities: [],
            previewImgUrl: "",
            avatar: "",
            isOpen: false,
            contentMarkdown: "",
            contentHTML: "",
            isHaveUpdate: CRUD_ACTION.CREATE,
        };
    }
    async componentDidMount() {
        // fetch cac chuyen khoa
        this.props.getSpecialties("ALL");
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.specialities !== this.props.specialities) {
            await this.setState({
                specialities: this.props.specialities,
            });
            this.setState({
                options: this.buildChooseSelectSpeciality(this.state.specialities),
            });
        }
    }
    handleEditorChange = ({ html, text }) => {
        this.setState({ contentMarkdown: text, contentHTML: html });
    };

    handleGetImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if (file) {
            let base64 = await CommonUtils.convertBase64(file);
            let objectImg = URL.createObjectURL(file);
            this.setState({
                previewImgUrl: objectImg,
                avatar: base64,
            });
        }
    };
    handleClickImage = () => {
        if (!this.state.previewImgUrl) return;
        else {
        }
        this.setState({
            isOpen: true,
        });
    };

    handleChangeSelect = async (selectedOption) => {
        let item = await handleGetSpeciality(selectedOption.value);
        let imageBase64 = "";
        if (item.data.image) {
            imageBase64 = new Buffer(item.data.image, "base64").toString("binary");
        }
        this.setState(
            {
                selectedOption,
                previewImgUrl: imageBase64,
                contentMarkdown: item.data.contentMarkdown,
                contentHTML: item.data.contentHTML,
                avatar: imageBase64
            },
            () => {
                if (this.state.contentMarkdown) {
                    this.setState({ isHaveUpdate: CRUD_ACTION.EDIT });
                } else this.setState({ isHaveUpdate: CRUD_ACTION.CREATE });
            }
        );
    };
    buildChooseSelectSpeciality = (data) => {
        if (data && data.length > 0) {
            let doctors = data.map((speciality) => {
                let selectDoctor = {};
                selectDoctor.label = speciality.name;
                selectDoctor.value = speciality.id;
                return selectDoctor;
            });
            return doctors;
        }
        return [];
    };
    handleClickBtnSave = async () => {
        let { selectedOption } = this.state;
        await handleUpdateSpeciality(selectedOption.value, {
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            avatar: this.state.avatar,
        });
        this.setState({
            selectedOption: "",
            previewImgUrl: "",
            avatar: "",
            contentMarkdown: "",
            contentHTML: "",
        });
        if (this.state.isHaveUpdate === CRUD_ACTION.EDIT) {
            toast.success("Update success!");
        } else toast.success("Create success!");
    };
    render() {
        return (
            <div className="container container-speciality ">
                <div className="title">Manage Speciality</div>
                <div className="speciality">
                    <div className="form-group col-5">
                        <label className="form-label">Tên chuyên khoa</label>
                        <Select
                            value={this.state.selectedOption}
                            onChange={this.handleChangeSelect}
                            options={this.state.options}
                        />
                    </div>
                    <div className="form-group image">
                        <label className="form-label">Hình ảnh về chuyên khoa</label>
                        <div className="image-preview-container">
                            <label className="image-upload" htmlFor="image-preview">
                                Tải ảnh <i className="fas fa-upload"></i>
                            </label>
                            <input
                                className="form-control"
                                id="image-preview"
                                type="file"
                                hidden
                                onChange={(event) => this.handleGetImage(event)}
                            />
                            <div
                                className="preview-image"
                                style={{ backgroundImage: `url(${this.state.previewImgUrl})` }}
                                onClick={() => this.handleClickImage()}
                            ></div>
                        </div>
                    </div>
                    {this.state.isOpen === true && (
                        <Lightbox
                            mainSrc={this.state.previewImgUrl}
                            onCloseRequest={() => this.setState({ isOpen: false })}
                        />
                    )}
                </div>
                <div className="description">
                    <h5>Mô tả về chuyên khoa</h5>
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={
                        this.state.isHaveUpdate === CRUD_ACTION.CREATE
                            ? "btn btn-primary px-3"
                            : "btn btn-secondary px-3"
                    }
                    onClick={() => this.handleClickBtnSave()}
                >
                    {this.state.isHaveUpdate === CRUD_ACTION.CREATE
                        ? "Tạo thông tin"
                        : "Cập nhật thông tin"}
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        specialities: state.clinic.specialities,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getSpecialties: (data) => dispatch(actions.fetchSpecialityStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpeciality);
