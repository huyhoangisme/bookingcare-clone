import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./ManageSpeciality.scss";
import { toast } from "react-toastify";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../../utils";
import Lightbox from "react-image-lightbox";
import { handleCreateClinic } from "../../../services/doctorService";
import { LANGUAGES } from '../../../utils/constant'
const mdParser = new MarkdownIt(/* Markdown-it options */);

class CreateClinic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImgUrl: "",
            avatar: "",
            isOpen: false,
            nameClinic: "",
            contentMarkdown: "",
            contentHTML: "",
            address: "",
        };
    }
    async componentDidMount() { }
    async componentDidUpdate(prevProps, prevState) { }
    handleChangeClinic = (event, value) => {
        let copyState = { ...this.state };
        copyState[value] = event.target.value;
        this.setState({
            ...copyState,
        });
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html,
        });
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
    handleClickBtn = async () => {
        if (!this.state.nameClinic) {
            toast.error("Make a clinic failed");
            return;
        }
        console.log(this.state);
        await handleCreateClinic({
            nameClinic: this.state.nameClinic,
            contentMarkdown: this.state.contentMarkdown,
            contentHTML: this.state.contentHTML,
            avatar: this.state.avatar,
            address: this.state.address,
        });
        this.setState({
            previewImgUrl: "",
            avatar: "",
            isOpen: false,
            nameClinic: "",
            contentMarkdown: "",
            contentHTML: "",
            address: ''
        });
        toast.success("Make a clinic success");
    };
    render() {
        return (
            <div className="container container-speciality ">
                <div className="title">Make Clinics</div>
                <div className="speciality">
                    <div className="form-group col-5">
                        <label className="form-label">Tên phòng khám</label>
                        <input
                            className="form-control"
                            value={this.state.nameClinic}
                            onChange={(event, id) =>
                                this.handleChangeClinic(event, "nameClinic")
                            }
                            placeholder={LANGUAGES.VI === this.props.language ? "Nhập tên phòng khám..." : "Please enter name clinic..."}
                        />
                        <label className="form-label">Địa chỉ</label>
                        <input
                            className="form-control"
                            value={this.state.address}
                            onChange={(event, id) =>
                                this.handleChangeClinic(event, "address")
                            }
                            placeholder={LANGUAGES.VI === this.props.language ? "Nhập địa chỉ phòng khám..." : "Please enter address clinic..."}
                        />
                    </div>

                    <div className="form-group image">
                        <label className="form-label">Hình ảnh về phòng khám</label>
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
                    <h5>Mô tả về phòng khám</h5>
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className="btn btn-primary px-3"
                    onClick={() => this.handleClickBtn()}
                >
                    Tạo phòng khám
                </button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateClinic);
