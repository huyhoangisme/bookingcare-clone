import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    position: [],
    isLoading: false,
    allUsers: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoading = true;
            return {
                ...state,

            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoading = false;
            return {
                ...state,
                genders: action.genders
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoading = false;
            state.genders = [];
            return {
                ...state,
            }
        // role reducer
        case actionTypes.FETCH_ROLE_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.isLoading = false;
            return {
                ...state,
                roles: action.roles
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.isLoading = false;
            state.roles = [];
            return {
                ...state,
            }
        // Position reducer
        case actionTypes.FETCH_POSITION_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.isLoading = false;
            return {
                ...state,
                positions: action.positions
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isLoading = false;
            state.positions = [];
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_SUCCESS:
            state.isLoading = false;
            return {
                ...state,
            }
        case actionTypes.CREATE_USER_FAILED:
            state.isLoading = false;
            return {
                ...state,
            }

        // 
        case actionTypes.GET_ALL_USERS_START:
            state.isLoading = true;
            return {
                ...state,
            }
        case actionTypes.GET_ALL_USERS_SUCCESS:
            state.isLoading = false;
            return {
                ...state,
                allUsers: action.allUsers
            }
        case actionTypes.GET_ALL_USERS_FAILED:
            state.isLoading = false;
            state.allUsers = [];
            return {
                ...state,
            }
        // case actionTypes.FETCH_UPDATE_USER_SUCCESS:
        //     state.isLoading = false;
        //     return {
        //         ...state,
        //         // allUsers: action.allUsers
        //     }
        // case actionTypes.FETCH_UPDATE_USER_FAILED:
        //     state.isLoading = false;
        //     state.allUsers = [];
        //     return {
        //         ...state,
        //     }
        default:
            return state;
    }
}

export default adminReducer;