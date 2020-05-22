import {
    LOAD_MESSAGES,
    POST_MESSAGES,
    POST_MESSAGE_SUCCESS,
    UPDATE_MESSAGE,
    MESSAGE_ERROR
} from "./actions";
import axios from "axios";
import { returnErrors } from "./authAction";

export const loadAllMessages = () => async dispatch => {

    const data = await axios.get("/api/usermessage")
    dispatch({
        type: LOAD_MESSAGES,
        payload: data.data
    })
};

export const postMessages = (data) => async dispatch => {

    try {
        await axios.post("/api/usermessage", data)
        dispatch({
            type: POST_MESSAGES
        })

    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, MESSAGE_ERROR))
    }

};

export const postMessageSuccess = () => {
    return {
        type: POST_MESSAGE_SUCCESS
    }
};

export const changeMessageStatus = (id, data) => async dispatch => {

    try {
        const response = await axios.put("/api/usermessage/" + id, data)
        console.log("ACTION OUT", response.data);
        dispatch({
            type: UPDATE_MESSAGE,
            payload: response.data
        })
    } catch (err) {
        dispatch(returnErrors(err.response.data, err.response.status, MESSAGE_ERROR));
    }
};
