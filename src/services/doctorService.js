
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
export {
    handleGetTopDoctor,
    handleGetAllDoctor,
    handleCreateDetailDoctor,
    handleDetailDoctor
};