
import axios from '../axios'

const handleGetTopDoctor = (limit) => {
    return axios.get(`api/v1/get-top-doctor?limit=${limit}`)
}
export {

    handleGetTopDoctor
};