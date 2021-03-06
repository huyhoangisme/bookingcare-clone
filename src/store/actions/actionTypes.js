const actionTypes = Object.freeze({
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE',
    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',
    // admin
    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: 'FETCH_GENDER_SUCCESS',
    FETCH_GENDER_FAILED: 'FETCH_GENDER_FAILED',
    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: 'FETCH_ROLE_SUCCESS',
    FETCH_ROLE_FAILED: 'FETCH_ROLE_FAILED',
    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: 'FETCH_POSITION_SUCCESS',
    FETCH_POSITION_FAILED: 'FETCH_POSITION_FAILED',

    CREATE_USER_START: 'CREATE_USER_START',
    CREATE_USER_SUCCESS: 'CREATE_USER_SUCCESS',
    CREATE_USER_FAILED: 'CREATE_USER_FAILED',

    // get all users in  the database
    GET_ALL_USERS_START: 'GET_ALL_USERS_START',
    GET_ALL_USERS_SUCCESS: 'GET_ALL_USERS_SUCCESS',
    GET_ALL_USERS_FAILED: 'GET_ALL_USERS_FAILED',
    // delete user in the database
    DELETE_USER_START: 'DELETE_USER_START',
    DELETE_USER_SUCCESS: 'DELETE_USER_SUCCESS',
    DELETE_USER_FAILED: 'DELETE_USER_FAILED',

    FETCH_UPDATE_USER_START: 'FETCH_UPDATE_USER_START',
    FETCH_UPDATE_USER_SUCCESS: 'FETCH_UPDATE_USER_SUCCESS',
    FETCH_UPDATE_USER_FAILED: 'FETCH_UPDATE_USER_FAILED',
    // DOCTOR
    FETCH_TOP_DOCTOR_START: "FETCH_TOP_DOCTOR_START",
    FETCH_TOP_DOCTOR_SUCCESS: "FETCH_TOP_DOCTOR_SUCCESS",
    FETCH_TOP_DOCTOR_FAILED: "FETCH_TOP_DOCTOR_FAILED",
    FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS",
    FETCH_ALL_DOCTOR_FAILED: "FETCH_ALL_DOCTOR_FAILED",
    FETCH_CREATE_DETAIL_SUCCESS: "FETCH_CREATE_DETAIL_SUCCESS",
    FETCH_CREATE_DETAIL_FAILED: "FETCH_CREATE_DETAIL_FAILED",

    FETCH_DETAIL_DOCTOR_SUCCESS: "FETCH_DETAIL_DOCTOR_SUCCESS",
    FETCH_DETAIL_DOCTOR_FAILED: "FETCH_DETAIL_DOCTOR_FAILED",

    FETCH_SCHEDULE_DOCTOR_SUCCESS: "FETCH_SCHEDULE_DOCTOR_SUCCESS",
    FETCH_SCHEDULE_DOCTOR_FAILED: "FETCH_SCHEDULE_DOCTOR_FAILED",

    FETCH_SPECIALITY_SUCCESS: "FETCH_SPECIALITY_SUCCESS",
    FETCH_SPECIALITY_FAILED: "FETCH_SPECIALITY_FAILED",

    // clinic
    FETCH_CLINIC_SUCCESS: "FETCH_CLINIC_SUCCESS",
    FETCH_CLINIC_FAILED: "FETCH_CLINIC_FAILED",
    // allcode
    FETCH_ALLCODE_BY_REQUIRED_SUCCESS: "FETCH_ALLCODE_BY_REQUIRED_SUCCESS",
    FETCH_ALLCODE_BY_REQUIRED_FAILED: "FETCH_ALLCODE_BY_REQUIRED_FAILED"

})

export default actionTypes;