import axios from "axios";


export default {

    login: function (data) {
        return axios.post("/api/users/auth", data)
    },
    register: function (data) {
        return axios.post("/api/users/register", data)
    },
    getUser: function () {
        return axios({
            method: "GET",
            url: "/api/users/user",
            headers: {
                "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlODk2YTQ5MjI5YmUwODVjOGYwYjYyZSIsImlhdCI6MTU4NjA2NjYwMiwiZXhwIjoxNTg2MDcwMjAyfQ.iTb5EIMBm3aFX-p2K36eBidC3MMIyZoeEpPp42DMbOU"
            }
        })
    },
    getTickets: function () {
        return axios.get("/api/tickets")
    },
    addTicket: function (data) {
        return axios.post("/api/tickets", data)
    },
    addImage: function (data, config) {
        return axios.post("/api/ticket/image/upload", data, config)
    },
    getFiles: function () {
        return axios.get("/api/ticket/files")
    },
    getImage: function (imagename) {
        return axios.get("/api/ticket/image/" + imagename)
    }
}