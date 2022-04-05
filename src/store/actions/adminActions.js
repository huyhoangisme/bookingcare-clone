import actionTypes from './actionTypes';
import {
    handleGetAllCode,
    handleCreateUser,
    handleGetAllUser,
    handleDeleteUser,
    handleUpdateUser
} from '../../services/userService';
import { toast } from "react-toastify";
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await handleGetAllCode('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFailed());
            }
        } catch (err) {
            dispatch(fetchGenderFailed());
        }
    }
}
export const fetchGenderSuccess = (dataSuccess) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genders: dataSuccess
})
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED,
})
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCH_ROLE_START })
        try {
            let res = await handleGetAllCode("ROLE");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFailed());
            }
        }
        catch (err) {
            dispatch(fetchRoleFailed())
        }
    }
}
export const fetchRoleSuccess = (dataRole) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roles: dataRole
})
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED,
})
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        dispatch({ type: actionTypes.FETCH_POSITION_START })
        try {
            let res = await handleGetAllCode("POSITION");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFailed());
            }
        }
        catch (err) {
            dispatch(fetchPositionFailed())
        }
    }
}
export const fetchPositionSuccess = (dataPosition) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positions: dataPosition
})
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED,
})
export const fetchCreateNewUserStart = (data) => {
    // type: actionTypes.CREATE_USER_START,
    return async (dispatch) => {
        dispatch({ type: actionTypes.CREATE_USER_START })
        try {
            let res = await handleCreateUser(data);
            if (res && res.errCode === 0) {
                dispatch(fetchCreateNewUserSuccess());
                toast.success("Create new user succeeded")
            } else {
                dispatch(fetchCreateNewUserFailed())
            }

        } catch (err) {
            dispatch(fetchCreateNewUserFailed())
            console.log(err)
        }
    }
}
export const fetchCreateNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})
export const fetchCreateNewUserFailed = () => ({
    type: actionTypes.CREATE_USER_FAILED,
})
export const fetchAllUserStart = () => {

    return async (dispatch) => {
        try {
            dispatch({ type: actionTypes.GET_ALL_USERS_START })
            let res = await handleGetAllUser('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.data))
            } else {
                dispatch(fetchAllUserFailed())
            }

        } catch (err) {
            dispatch(fetchAllUserFailed);
        }
    }
}
export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.GET_ALL_USERS_SUCCESS,
    allUsers: data

})
export const fetchAllUserFailed = () => ({
    type: actionTypes.GET_ALL_USERS_FAILED,
})
export const deleteUserStart = (id) => {
    return async (dispatch) => {
        try {
            let res = await handleDeleteUser(id);
            dispatch(deleteUserSuccess());
            toast.success("Delete user success!");
        } catch (err) {
            dispatch(deleteUserFailed())
            console.log(err)
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,
})
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILED,

})

export const updateUserStart = (item) => {
    // type: actionTypes.FETCH_UPDATE_USER_START,
    return async (dispatch) => {
        try {
            let res = await handleUpdateUser(item);
            if (res && res.errCode === 0) {
                dispatch(updateUserSuccess())
            }
        } catch (err) {
            dispatch(updateUserFailed())
            console.log(err)
        }
    }
}
export const updateUserSuccess = () => ({
    type: actionTypes.FETCH_UPDATE_USER_SUCCESS,

})
export const updateUserFailed = () => ({
    type: actionTypes.FETCH_UPDATE_USER_FAILED,

})


