import actionTypes from './actionTypes';
import {
    handleGetTopDoctor, handleGetAllDoctor,
    handleCreateDetailDoctor, handleDetailDoctor,
} from '../../services/doctorService';
import { handleGetAllCode } from '../../services/userService'
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
export const fetchAllDoctorStart = () => {
    return async (dispatch) => {
        try {
            let res = await handleGetAllDoctor('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                dispatch(fetchAllDoctorFailed())
            }
        } catch (err) {
            dispatch(fetchAllDoctorFailed())
        }
    }
}
export const fetchAllDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    allDoctors: data
})
export const fetchAllDoctorFailed = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
})

export const fetchCreateDoctorStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await handleCreateDetailDoctor(data);
            if (res && res.errCode === 0) {
                dispatch(fetchCreateDoctorSuccess());
            } else {
                dispatch(fetchCreateDoctorFailed())
            }
        } catch (err) {
            dispatch(fetchCreateDoctorFailed())
        }
    }
}
export const fetchCreateDoctorSuccess = () => ({
    type: actionTypes.FETCH_CREATE_DETAIL_SUCCESS,
})
export const fetchCreateDoctorFailed = () => ({
    type: actionTypes.FETCH_CREATE_DETAIL_FAILED,
})

export const fetchDetailDoctorStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await handleDetailDoctor(+data);
            if (res && res.errCode === 0) {
                dispatch(fetchDetailDoctorSuccess(res.data))
            } else dispatch(fetchDetailDoctorFailed())

        } catch (err) {
            dispatch(fetchDetailDoctorFailed())
        }
    }
}
export const fetchDetailDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS,
    detailDoctor: data
})
export const fetchDetailDoctorFailed = () => ({
    type: actionTypes.FETCH_DETAIL_DOCTOR_FAILED,
})

export const fetchScheduleDoctorStart = () => {
    return async (dispatch) => {
        try {
            let res = await handleGetAllCode('TIME');
            if (res && res.errCode === 0) {
                dispatch(fetchScheduleDoctorSuccess(res.data))
            } else dispatch(fetchScheduleDoctorFailed())
        } catch (e) {
            dispatch(fetchScheduleDoctorFailed())
        }
    }
}
export const fetchScheduleDoctorSuccess = (data) => ({
    type: actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS,
    scheduleDoctor: data
})
export const fetchScheduleDoctorFailed = () => ({
    type: actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED,
})






