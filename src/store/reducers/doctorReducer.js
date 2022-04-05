import actionTypes from '../actions/actionTypes';

const initialState = {
    topDoctor: [],
    isLoading: false
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
        default:
            return state;
    }
}

export default doctorReducer;