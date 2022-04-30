import actionTypes from '../actions/actionTypes';

const initialState = {
    specialities: [],
    clinics: [],
}

const clinicReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_SPECIALITY_SUCCESS:
            state.specialities = action.specialities;
            return {
                ...state,
            }
        case actionTypes.FETCH_SPECIALITY_FAILED:
            state.specialities = [];
            return {
                ...state,
            }
        // clinic
        case actionTypes.FETCH_CLINIC_SUCCESS:
            state.clinics = action.clinics;
            return {
                ...state,
            }
        case actionTypes.FETCH_CLINIC_FAILED:
            state.clinics = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default clinicReducer;