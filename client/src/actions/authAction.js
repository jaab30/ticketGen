
import axios from "axios";
import { UPDATE_PROFILE, UPDATE_ERROR, UPDATE_SUCCESS } from "../actions/actions";

// Return errors
export const returnErrors = (msg, status, id = null) => {
    return {
        type: "GET_ERRORS",
        payload: { msg, status, id }
    };
};
// Clear errors
export const clearErrors = () => {
    return {
        type: "CLEAR_ERRORS",
    };
};

// Check token and load user

export const loadUser = () => (dispatch, getState) => {

    //User loading
    dispatch({ type: "USER_LOADING" });

    axios.get("/api/users/user", tokenConfig(getState))
        .then(data => dispatch({
            type: "USER_LOADED",
            payload: data.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type: "AUTH_ERROR"
            })
        })

};

// Register User

export const login = ({ email, password, role }) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    // Request Body
    const body = JSON.stringify({ email, password, role });

    axios.post("/api/users/auth", body, config)
        .then(res => dispatch({
            type: "LOGIN_SUCCESS",
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "LOGIN_FAIL"));
            dispatch({
                type: "LOGIN_FAIL",

            })
        })



}

export const register = ({ firstName, lastName, email, address, address2, city, state, zip, phoneNumber, password, role }) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }
    // Request Body
    const body = JSON.stringify({ firstName, lastName, email, address, address2, city, state, zip, phoneNumber, password, role });

    axios.post("/api/users/register", body, config)
        .then(res => dispatch({
            type: "REGISTER_SUCCESS",
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, "REGISTER_FAIL"));
            dispatch({
                type: "REGISTER_FAIL",

            })
        })
}

export const logout = () => {
    return {
        type: "LOGOUT_SUCCESS"
    }
}

// Setup Config/headers and token
export const tokenConfig = getState => {
    //get token from local storage
    const token = getState().authReducer.token;
    // Headres
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


export const updateProfile = (id, data) => (dispatch, getState) => {
    axios.put("/api/users/user/update/" + id, data, tokenConfig(getState))
        .then(data => {
            console.log(data)
            dispatch({
                type: UPDATE_PROFILE,
                payload: data.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, UPDATE_ERROR));
            dispatch({
                type: UPDATE_ERROR,

            })
        })
}

export const updateSuccess = () => {
    return {
        type: UPDATE_SUCCESS
    }
}






