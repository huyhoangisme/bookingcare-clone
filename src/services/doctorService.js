
import axios from '../axios'

const handleGetTopDoctor = (limit) => {
    return axios.get(`api/v1/get-top-doctor?limit=${limit}`);
}
const handleGetAllDoctor = (type) => {
    return axios.get(`api/v1/get-all-doctor?id=${type}`);
}
const handleCreateDetailDoctor = (data) => {
    return axios.post(`api/v1/update-detail-doctor`, data);
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
export {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateDetailDoctor,
    handleDetailDoctor,
    handleCreateScheduleDoctor,
    handleGetScheduleDoctor
};