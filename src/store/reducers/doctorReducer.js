import actionTypes from '../actions/actionTypes';
import { DOCTOR } from '../../utils/constant';
const initialState = {
    topDoctor: [],
    isLoading: false,
    allDoctors: [],
    detailDoctor: {},
    scheduleDoctor: [],
    listAllCode: {}

}

const doctorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TOP_DOCTOR_START:
            state.isLoading = true;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.isLoading = false;
            state.topDoctor = action.topDoctor;
            return {
                ...state,

            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.isLoading = false;
            state.topDoctor = []
            return {
                ...state,

            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.allDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_CREATE_DETAIL_SUCCESS:
            return {
                ...state,
            }
        case actionTypes.FETCH_CREATE_DETAIL_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_SUCCESS:
            state.detailDoctor = action.detailDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_FAILED:
            return {
                ...state,
            }
        case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
            state.scheduleDoctor = action.scheduleDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_SCHEDULE_DOCTOR_FAILED:
            state.scheduleDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_BY_REQUIRED_SUCCESS:
            state.listAllCode = action.allCodeRequired;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_BY_REQUIRED_FAILED:
            state.listAllCode = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default doctorReducer;