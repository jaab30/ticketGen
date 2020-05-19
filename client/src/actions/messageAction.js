import {
    POST_MESSAGES,
    POST_MESSAGE_SUCCESS,
    MESSAGE_ERROR
} from "./actions";
import axios from "axios";
import { returnErrors } from "./authAction";


export const postMessages = (data) => dispatch => {

    axios.post("/api/usermessage", data)
        .then(data => {

            dispatch({
                type: POST_MESSAGES
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, MESSAGE_ERROR))
        });

}

export const postMessageSuccess = () => {
    return {
        type: POST_MESSAGE_SUCCESS
    }
}