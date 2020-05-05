import {
    UPDATE_PROFILE,
    UPDATE_SUCCESS,
    UPDATE_PROFILE_IMAGE,
    PROFILE_IMAGE_LOADING,
    DELETE_PROFILE_IMAGE
} from "../actions/actions";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: false,
    isLoading: false,
    isUpdateSuccess: false,
    isImageLoading: true,
    user: null
}

export default function (state = initialState, action) {

    switch (action.type) {
        case "USER_LOADING":
            return {
                ...state,
                isLoading: true
            };
        case "USER_LOADED":
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case "LOGIN_SUCCESS":
        //if user.role===admin - admin-token else user-token
        case "REGISTER_SUCCESS":
            localStorage.setItem("token", action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case "AUTH_ERROR":
        case "LOGIN_FAIL":
        case "LOGOUT_SUCCESS":
        case "REGISTER_FAIL":
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        case UPDATE_PROFILE:

            const { firstName, lastName, address, address2, city, zip, phoneNumber } = action.payload;

            return {
                ...state,
                isUpdateSuccess: true,
                user: {
                    ...state.user,
                    firstName,
                    lastName,
                    address,
                    address2,
                    city,
                    state: action.payload.state,
                    zip,
                    phoneNumber
                }
            };
        case UPDATE_PROFILE_IMAGE:
            return {
                ...state,
                isUpdateSuccess: true,
                isImageLoading: false,
                user: {
                    ...state.user,
                    image: action.payload
                }
            };
        case PROFILE_IMAGE_LOADING:
            return {
                ...state,
                isImageLoading: action.payload
            };
        case DELETE_PROFILE_IMAGE:
            return {
                ...state,
                isUpdateSuccess: true,
                isImageLoading: false,
                user: {
                    ...state.user,
                    image: ""
                }
            };
        case UPDATE_SUCCESS:
            return {
                ...state,
                isUpdateSuccess: false
            }
        default:
            return state;
    }
};