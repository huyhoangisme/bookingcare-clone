
import axios from '../axios'

const handleLoginApi = (email, password) => {
    return axios.post('api/v1/user/login', { email, password });
}
const handleGetAllUser = (id) => {
    return axios.get(`api/v1/user/get-all-user?id=${id}`);
}
const handleCreateUser = (user) => {
    return axios.post('api/v1//user/create-user', user);
}
const handleDeleteUser = (id) => {
    return axios.delete(`api/v1/user/delete-user?id=${id}`);
}
const handleUpdateUser = (item) => {
    return axios.put(`api/v1/user/update-user?id=${item.id}`, item);
}
const handleGetAllCode = (input) => {
    return axios.get(`api/v1/allcode?type=${input}`);
}
export {
    handleLoginApi,
    handleGetAllUser,
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleGetAllCode
};