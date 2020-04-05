export const newUser = (data) => {
    return {
        type: "NEW_USER",
        payload: data
    }
};

export const currentUser = (chosen) => {

    return {
        type: "CURRENT_USER",
        payload: chosen
    }
};