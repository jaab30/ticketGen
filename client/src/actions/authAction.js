import axios from "axios";
import {
    UPDATE_PROFILE,
    UPDATE_ERROR,
    UPDATE_SUCCESS,
    UPDATE_PROFILE_IMAGE,
    UPDATE_PROFILE_IMAGE_ERROR,
    PROFILE_IMAGE_LOADING,
    DELETE_PROFILE_IMAGE,
    GET_ERRORS,
    CLEAR_ERRORS,
    USER_LOADING,
    USER_LOADED,
    ALL_USERS_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from "../actions/actions";

// Return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: GET_ERRORS,
        payload: { msg, status, id }
    };
};
// Clear errors
export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS,
    };
};

// Check token and load user

export const loadUser = () => async (dispatch, getState) => {
    //User loading
    dispatch({ type: USER_LOADING });
    try {
        const res = await axios.get("/api/users/user", tokenConfig(getState))
        dispatch({
            type: USER_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    }
};
export const loadAllUsers = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("/api/users", tokenConfig(getState))
        dispatch({
            type: ALL_USERS_LOADED,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status));
        dispatch({
            type: AUTH_ERROR
        })
    }

};

// Register User
export const login = ({ email, password, role }) => async dispatch => {
    try {
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        // Request Body
        const body = JSON.stringify({ email, password, role });
        const res = await axios.post("/api/users/auth", body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

export const register = ({ firstName, lastName, email, address, address2, city, state, zip, phoneNumber, password, confirmPassword, role }) => async dispatch => {
    try {
        // headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        // Request Body
        const body = JSON.stringify({ firstName, lastName, email, address, address2, city, state, zip, phoneNumber, password, confirmPassword, role });

        const res = await axios.post("/api/users/register", body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })

    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAIL));
        dispatch({
            type: REGISTER_FAIL
        })
    }
}

export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// Setup Config/headers and token
export const tokenConfig = getState => {
    //get token from local storage
    const token = getState().authReducer.token;
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    if (token) {
        config.headers["x-auth-token"] = token;
    }

    return config
}


export const updateProfile = (id, data) => async (dispatch, getState) => {
    try {
        const res = await axios.put("/api/users/user/update/" + id, data, tokenConfig(getState))
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, UPDATE_ERROR));
        dispatch({
            type: UPDATE_ERROR
        })
    }
}


export const updateProfileImage = (data, config) => async (dispatch) => {
    try {
        const res = await axios.post("/api/users/user/image/upload", data, config)
        dispatch({
            type: UPDATE_PROFILE_IMAGE,
            payload: res.data.image
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, UPDATE_PROFILE_IMAGE_ERROR));

    }
}
export const isLoadingProfileImage = (status) => {
    return {
        type: PROFILE_IMAGE_LOADING,
        payload: status
    }
}
export const deleteProfileImage = (filename, userId) => async dispatch => {
    try {
        await axios.delete("/api/ticket/image/" + userId + "/" + filename)
        dispatch({
            type: DELETE_PROFILE_IMAGE
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, UPDATE_PROFILE_IMAGE_ERROR));

    }
}

export const updateSuccess = () => {
    return {
        type: UPDATE_SUCCESS
    }
}






