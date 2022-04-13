import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctor: [],
    isLoading: false,
    allDoctors: [],
    detailDoctor: {}
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
            console.log("success", action)
            state.detailDoctor = action.detailDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTOR_FAILED:
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default doctorReducer;