import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageDoctor.scss";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions";
import Select from "react-select";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { LANGUAGES, CRUD_ACTION, DOCTOR } from "../../../utils/constant";
import CommonUtils from "../../../utils/CommonUtils";
import "react-markdown-editor-lite/lib/index.css";

import _ from "lodash";
import {
    handleDetailDoctor,
    handleCreateDetailDoctor,
    handleGetDoctorInfoByID
} from "../../../services/doctorService";
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDoctor: {},
            selectedClinic: {},
            selectedSpeciality: {},
            selectedPrice: {},
            selectedPayCash: {},
            selectedAddress: {},
            contentHTML: "",
            contentMarkdown: "",
            description: "",
            listDoctors: [],
            specialies: [],
            clinics: [],
            province: [],
            payment: [],
            price: [],
            isHaveMarkdown: "",
        };
    }

    async componentDidMount() {
        this.props.getAllDoctorStart();
        this.props.allCodeRequired();
        this.props.getClinics("ALL");
        this.props.getSpecialties("ALL");
    }
    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.allDoctors !== this.props.allDoctors) {
            let doctors = this.buildChooseSelect(this.props.allDoctors, "DOCTOR");
            this.setState({ listDoctors: doctors });
        }
        if (prevProps.clinics !== this.props.clinics) {
            let clinics = this.buildChooseSelect(this.props.clinics, "CLINIC");
            this.setState({ clinics });
        }
        if (prevProps.specialities !== this.props.specialities) {
            let specialies = this.buildChooseSelect(this.props.specialities, "SPECIALITY");
            this.setState({ specialies });
        }
        if (prevProps.listAllCode !== this.props.listAllCode) {
            let { listPrice, listPayment, listProvince } = this.props.listAllCode;
            listPrice = this.buildChooseSelect(listPrice, "PRICE");
            listPayment = this.buildChooseSelect(listPayment, "PAYMENT");
            listProvince = this.buildChooseSelect(listProvince, "PROVINCE");

            this.setState({
                province: listProvince,
                payment: listPayment,
                price: listPrice
            })
        }
        if (prevProps.language !== this.props.language) {
            let doctors = this.buildChooseSelect(this.props.allDoctors, "DOCTOR");
            let specialies = this.buildChooseSelect(this.props.specialities, "SPECIALITY");
            let clinics = this.buildChooseSelect(this.props.clinics, "CLINIC");
            let { listPrice, listPayment, listProvince } = this.props.listAllCode;
            listPrice = this.buildChooseSelect(listPrice, "PRICE");
            listPayment = this.buildChooseSelect(listPayment, "PAYMENT");
            listProvince = this.buildChooseSelect(listProvince, "PROVINCE");
            this.setState({
                listDoctors: doctors,
                specialies: specialies,
                clinics: clinics,
                province: listProvince,
                payment: listPayment,
                price: listPrice
            });
        }
    }

    buildChooseSelect = (data, type) => {
        if (data && data.length > 0) {
            if (type === DOCTOR.DOCTOR) {
                let doctors = data.map((doctor) => {
                    let selectDoctor = {};
                    let valueVi = `${doctor.firstName} ${doctor.lastName}`;
                    let valueEn = `${doctor.lastName} ${doctor.firstName}`;
                    selectDoctor.label =
                        LANGUAGES.VI === this.props.language ? valueVi : valueEn;
                    selectDoctor.value = doctor.id;
                    return selectDoctor;
                });
                return doctors;
            } else if (type == "CLINIC" || type == "SPECIALITY") {
                let products = data.map((item) => {
                    let selected = {};
                    let valueVi = `${item.name}`;
                    selected.label = valueVi;
                    selected.value = item.id;
                    return selected;
                });
                return products;
            } else if (type === "PRICE") {
                let products = data.map((item) => {
                    let items = {};
                    let valueVi = `${CommonUtils.formatNumber(item.valueVi)} VND`;
                    let valueEn = `${item.valueEn} USD`;
                    items.label =
                        LANGUAGES.VI === this.props.language ? valueVi : valueEn;
                    items.value = item.keyMap;
                    return items;
                });
                return products;
            } else if (type === "PAYMENT" || type === "PROVINCE") {
                let products = data.map((item) => {
                    let items = {};
                    let valueVi = `${item.valueVi}`;
                    let valueEn = `${item.valueEn}`;
                    items.label =
                        LANGUAGES.VI === this.props.language ? valueVi : valueEn;
                    items.value = item.keyMap;
                    return items;
                });
                return products;
            }
        }
        return [];
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkdown: text,
        });
    };
    handleChangeSelect = async (selectedOption, id) => {
        // set state
        let oldStateDoctor = this.state.selectedDoctor;
        let copyState = { ...this.state };
        copyState[id.name] = selectedOption;
        await this.setState({ ...copyState });
        //    handle logic
        let res = await handleDetailDoctor(this.state.selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.Markdown) {
            let markdown = res.data.Markdown;
            if (!markdown.description) {
                markdown.description = "";
            }
            if (!markdown.contentMarkdown) {
                markdown.contentMarkdown = "";
            }
            if (!markdown.description && !markdown.contentMarkdown) {
                this.setState({
                    isHaveMarkdown: CRUD_ACTION.CREATE,
                });
            } else {
                this.setState({
                    isHaveMarkdown: CRUD_ACTION.EDIT,
                });
            }
            this.setState({
                contentHTML: markdown.contentHtml,
                contentMarkdown: markdown.contentMarkdown,
                description: markdown.description,
            })

            // xu li cho chon bac si
        } else {
            this.setState({
                contentHTML: "",
                contentMarkdown: "",
                description: "",
            });
        }
        if (oldStateDoctor !== this.state.selectedDoctor) {
            let doctorInfo = await handleGetDoctorInfoByID(this.state.selectedDoctor.value, id);
            if (doctorInfo && doctorInfo.errCode === 0) {
                if (!_.isEmpty(doctorInfo.data)) {
                    let response = doctorInfo.data;
                    let { specialies, clinics, province, payment, price } = this.state;
                    let selectedSpeciality = specialies.find(item => {
                        return item.value === response.specialityID;
                    })
                    let selectedClinic = clinics.find(item => {
                        return item.value === response.clinicID
                    })
                    let selectedPrice = price.find(item => {
                        return item.value === response.price
                    })
                    let selectedPayCash = payment.find(item => {
                        return item.value === response.paycash
                    })
                    let selectedAddress = province.find(item => {
                        return item.value === response.address
                    })
                    this.setState({
                        selectedSpeciality,
                        selectedClinic,
                        selectedPrice,
                        selectedPayCash,
                        selectedAddress
                    })
                }
                else {
                    this.setState({
                        selectedSpeciality: '',
                        selectedClinic: '',
                        selectedPrice: '',
                        selectedPayCash: '',
                        selectedAddress: ''
                    })
                }

            }
        }
    };
    handleChangeTextArea = (event) => {
        this.setState({
            description: event.target.value,
        });
    };

    handleClickBtnSave = async () => {
        // gui du lieu len api
        console.log(this.state)
        if (
            !this.state.selectedDoctor.value ||
            !this.state.selectedSpeciality.value ||
            !this.state.selectedClinic.value ||
            !this.state.selectedPrice.value ||
            !this.state.selectedPayCash.value ||
            !this.state.selectedAddress.value ||
            !this.state.contentHTML ||
            !this.state.contentMarkdown ||
            !this.state.description
        ) {
            toast.error("Create doctor infomation failed");
            return;
        }
        await handleCreateDetailDoctor({
            isHaveMarkdown: this.state.isHaveMarkdown,
            doctorId: this.state.selectedDoctor.value,
            contentHtml: this.state.contentHTML,
            contentMarkdown: this.state.contentMarkdown,
            description: this.state.description,
            specialityId: this.state.selectedSpeciality.value,
            clinicId: this.state.selectedClinic.value,
            priceId: this.state.selectedPrice.value,
            paymentId: this.state.selectedPayCash.value,
            addressId: this.state.selectedAddress.value
        })
        toast.success("Create doctor infomation success!");
        this.setState({
            selectedDoctor: {},
            selectedClinic: {},
            selectedSpeciality: {},
            selectedPrice: {},
            selectedPayCash: {},
            selectedAddress: {},
            contentHTML: "",
            contentMarkdown: "",
            description: "",
            isHaveMarkdown: "",
        })
    };
    render() {
        return (
            <>
                <div className="doctors-container mx-2">
                    <div className="title">Quản lí bác sĩ</div>
                    <div className="content">
                        <div className="select-doctor row d-flex">
                            <div className="form-group col-3 py-2">
                                <label className="form-label">Tên bác sĩ</label>
                                <Select
                                    value={this.state.selectedDoctor}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.listDoctors}
                                    name={"selectedDoctor"}
                                />
                            </div>
                            <div className="form-group col-3 py-2">
                                <label className="form-label">Chuyên Khoa</label>
                                <Select
                                    value={this.state.selectedSpeciality}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.specialies}
                                    name={"selectedSpeciality"}
                                />
                            </div>
                            <div className="form-group col-3 py-2">
                                <label className="form-label">Phòng khám</label>
                                <Select
                                    value={this.state.selectedClinic}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.clinics}
                                    name={"selectedClinic"}
                                />
                            </div>
                            <div className="form-group col-3 py-2">
                                <label className="form-label">Tiền khám</label>
                                <Select
                                    value={this.state.selectedPrice}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.price}
                                    name={"selectedPrice"}
                                />
                            </div>
                            <div className="form-group col-3 py-2">
                                <label className="form-label">Hình thức thanh toán</label>
                                <Select
                                    value={this.state.selectedPayCash}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.payment}
                                    name={"selectedPayCash"}
                                />
                            </div>
                            <div className="form-group col-3 py-2">
                                <label className="form-label">Nơi làm việc</label>
                                <Select
                                    value={this.state.selectedAddress}
                                    onChange={this.handleChangeSelect}
                                    options={this.state.province}
                                    name={"selectedAddress"}
                                />
                            </div>
                            <div className="more-info">
                                <h4>Mô tả bác sĩ</h4>
                                <textarea
                                    rows="5"
                                    onChange={(event) => this.handleChangeTextArea(event)}
                                    value={this.state.description}
                                >
                                    {this.state.description}
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                    <div
                        className=" btn btn-save px-3"
                        onClick={(event) => this.handleClickBtnSave(event)}
                    >
                        {this.state.isHaveMarkdown === CRUD_ACTION.EDIT
                            ? "Lưu thông tin"
                            : "Tạo thông tin"}
                    </div>
                </div>
            </>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        allDoctors: state.doctor.allDoctors,
        clinics: state.clinic.clinics,
        specialities: state.clinic.specialities,
        listAllCode: state.doctor.listAllCode
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctorStart: () => dispatch(actions.fetchAllDoctorStart()),
        getSpecialties: (data) => dispatch(actions.fetchSpecialityStart(data)),
        getClinics: (data) => dispatch(actions.fetchClinicStart(data)),
        allCodeRequired: () => dispatch(actions.fetchAllCodeByRequiredTypeStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
