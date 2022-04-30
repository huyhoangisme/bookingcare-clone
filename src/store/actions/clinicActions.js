import actionTypes from "./actionTypes";
import {
    handleGetSpeciality,
    handleGetClinic,
} from "../../services/doctorService";

export const fetchSpecialityStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await handleGetSpeciality(data);
            if (res && res.errCode === 0) {
                dispatch(fetchSpecialitySuccess(res.data));
            } else dispatch(fetchSpecialityFailed());
        } catch (err) {
            dispatch(fetchSpecialityFailed);
        }
    };
};
export const fetchSpecialitySuccess = (data) => ({
    type: actionTypes.FETCH_SPECIALITY_SUCCESS,
    specialities: data,
});
export const fetchSpecialityFailed = () => ({
    type: actionTypes.FETCH_SPECIALITY_FAILED,
});

// clinic
export const fetchClinicStart = (data) => {
    return async (dispatch) => {
        try {
            let res = await handleGetClinic(data);
            if (res && res.errCode === 0) {
                dispatch(fetchClinicSuccess(res.data));
            } else dispatch(fetchClinicFailed());
        } catch (err) {
            dispatch(fetchClinicFailed);
        }
    };
};
export const fetchClinicSuccess = (data) => ({
    type: actionTypes.FETCH_CLINIC_SUCCESS,
    clinics: data,
});
export const fetchClinicFailed = () => ({
    type: actionTypes.FETCH_CLINIC_FAILED,
});

