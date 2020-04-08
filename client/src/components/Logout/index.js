import React from "react";
import { NavLink } from "reactstrap";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";
import { clearTickets } from "../../actions/ticketAction";



function Logout() {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
        dispatch(clearTickets());
    }

    return (
        <React.Fragment>
            <NavLink onClick={handleClick} href="#">Logout</NavLink>
        </React.Fragment>
    )
}

export default Logout