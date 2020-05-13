import {
    LOAD_MESSAGES,
    POST_MESSAGES,
    POST_MESSAGE_SUCCESS
} from "../actions/actions";

const initialState = {
    messages: [],
    isPostMessageSuccess: false
}

export default function (state = initialState, actions) {

    switch (actions.type) {

        case POST_MESSAGES:
            return {
                ...state,
                isPostMessageSuccess: true
            }
        case POST_MESSAGE_SUCCESS:
            return {
                ...state,
                isPostMessageSuccess: false
            }
        case LOAD_MESSAGES:
            return {
                messages: actions.payload
            }
        default:
            return state
    }
}