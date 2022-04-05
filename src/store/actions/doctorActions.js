import actionTypes from './actionTypes';
import {
    handleGetTopDoctor
} from '../../services/doctorService';
// import { toast } from "react-toastify";


export const fetchTopDoctorStart = (limit) => {
    return async (dispatch) => {
        try {
            let res = await handleGetTopDoctor(+limit);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data))
            }
            else {
                dispatch(fetchTopDoctorFailed());
            }
        } catch (e) {
            dispatch(fetchTopDoctorFailed());
        }
    }
}
export const fetchTopDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    topDoctor: data
})
export const fetchTopDoctorFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})


