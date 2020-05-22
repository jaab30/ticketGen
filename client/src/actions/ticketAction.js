import axios from "axios";
import {
    LOAD_TICKETS,
    LOAD_TICKET_ERROR,
    LOAD_USER_TICKETS,
    POST_TICKET,
    UPDATE_TICKET,
    CLEAR_TICKETS,
    POST_ERROR,
    POST_SUCCESS,
    CURRENT_TICKET,
    POST_COMMENT,
    IS_NEW_COMMENT,
    COMMENT_ERROR,
    POST_IMAGE,
    IMAGE_ERROR,
    IS_LOADING,
    POST_SINGLE_IMAGE,
    CLEAR_SINGLE_IMAGE,
    UPDATE_PROFILE_IMAGE_ERROR,
    DELETE_NEW_TIX_IMAGE
} from "../actions/actions"
import { tokenConfig, returnErrors } from "./authAction";

export const loadAllTickets = () => async dispatch => {
    try {
        const res = await axios.get("/api/tickets")
        dispatch({
            type: LOAD_TICKETS,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, LOAD_TICKET_ERROR));
    }
}

export const loadUserTickets = () => async (dispatch, getState) => {
    try {
        const res = await axios.get("/api/users/user", tokenConfig(getState))
        dispatch({
            type: LOAD_USER_TICKETS,
            payload: res.data.tickets
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, LOAD_TICKET_ERROR));
    }
}

export const addTicket = (data) => async dispatch => {
    try {
        await axios.post("/api/tickets", data)
        dispatch({
            type: POST_TICKET
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, POST_ERROR));
    }
}

export const postSuccess = () => {
    return {
        type: POST_SUCCESS
    }
}

export const addComment = (id, data) => async dispatch => {
    try {
        const res = await axios.put("/api/ticket/comment/" + id, data)
        dispatch({
            type: POST_COMMENT,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, COMMENT_ERROR));

    }
}

export const isNewComment = (id, newUserComment, newAdminComment) => async dispatch => {

    try {
        let dataObj
        if (newUserComment === null) { dataObj = { newAdminComment } }
        if (newAdminComment === null) { dataObj = { newUserComment } }

        const res = await axios.put("/api/ticket/comment/new/" + id, dataObj)
        dispatch({
            type: IS_NEW_COMMENT,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, COMMENT_ERROR));
    }
}
export const changeTixStatus = (id, data) => async dispatch => {
    try {
        const res = await axios.put("/api/ticket/update/" + id, data)
        dispatch({
            type: UPDATE_TICKET,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, COMMENT_ERROR));
    }
}

export const clearTickets = () => {
    return {
        type: CLEAR_TICKETS
    }
}

export const currentTicket = (id) => {
    return {
        type: CURRENT_TICKET,
        payload: id
    }

}
// Image handlers *********************************************

export const addImage = (data, config) => async dispatch => {
    try {
        const res = await axios.post("/api/ticket/image/upload", data, config)
        dispatch({
            type: POST_IMAGE,
            payload: res.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, IMAGE_ERROR));
    }
}
export const addImageNewTix = (data, config) => async dispatch => {
    try {
        const res = await axios.post("/api/tickets/newimage/upload", data, config)
        dispatch({
            type: POST_SINGLE_IMAGE,
            payload: res.data.file.filename
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, IMAGE_ERROR));
    }
}

export const isLoadingImage = (status) => {

    return {
        type: IS_LOADING,
        payload: status
    }
}
export const clearCurrentImages = () => {

    return {
        type: CLEAR_SINGLE_IMAGE
    }
}

export const imageDeleteNewTix = (filename) => async dispatch => {
    try {
        await axios.delete("/api/ticket/newimage/" + filename)
        dispatch({
            type: DELETE_NEW_TIX_IMAGE,
            payload: filename
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, UPDATE_PROFILE_IMAGE_ERROR));
    }
}





