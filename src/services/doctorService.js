
import axios from '../axios'

const handleGetTopDoctor = (limit) => {
    return axios.get(`api/v1/get-top-doctor?limit=${limit}`);
}
const handleGetAllDoctor = (type) => {
    return axios.get(`api/v1/get-all-doctor?id=${type}`);
}
const handleCreateDetailDoctor = (data) => {
    return axios.post('api/v1/update-detail-doctor', data);
}
const handleDetailDoctor = (id) => {
    return axios.get(`api/v1/get-detail-doctor?id=${id}`)
}
const handleCreateScheduleDoctor = (data) => {
    return axios.post(`api/v1/create-schedule-doctor`, data);
}
const handleGetScheduleDoctor = (doctorId, date) => {
    return axios.get(`api/v1/get-schedule-doctor?doctorId=${doctorId}&date=${date}`)
}

const handleCreateDoctorInfo = (data) => {
    return axios.post(`api/v1/update-doctor-info`, data)
}

const handleGetDoctorInfoByID = (id) => {
    return axios.get(`api/v1/get-doctor-info-by-id?id=${id}`);
}
const handleGetSpecialityClinicByID = (doctorID) => {
    return axios.get(`api/v1/get-speciality-clinic-doctor-by-id?id=${doctorID}`);
}
// speciality
const handleGetSpeciality = (id) => {
    return axios.get(`api/v1/get-speciality?id=${id}`);
}
const handleCreateSpeciality = (speciality) => {
    return axios.post(`api/v1/create-speciality`, speciality)
}
const handleUpdateSpeciality = (id, speciality) => {
    return axios.put(`api/v1/update-speciality?id=${id}`, speciality)
}
// clinic
const handleCreateClinic = (data) => {
    return axios.post(`api/v1//create-clinic`, data);
}
const handleGetClinic = (id) => {
    return axios.get(`api/v1/get-clinic?id=${id}`);
}
const handleUpdateClinic = (id, data) => {
    return axios.put(`api/v1/update-clinic?id=${id}`, data);
}

export {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateDetailDoctor,
    handleDetailDoctor,
    handleCreateScheduleDoctor,
    handleGetScheduleDoctor,
    handleCreateDoctorInfo,
    handleGetDoctorInfoByID,
    handleGetSpecialityClinicByID,

    // speciality
    handleGetSpeciality,
    handleCreateSpeciality,
    handleUpdateSpeciality,

    // clinic
    handleCreateClinic,
    handleGetClinic,
    handleUpdateClinic
};