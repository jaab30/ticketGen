import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authAction";
import { clearTickets } from "../../actions/ticketAction";
import { clearErrors } from "../../actions/authAction";



function Logout(props) {

    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
        dispatch(clearTickets());
        dispatch(clearErrors());
    }

    return (
        <React.Fragment>
            {/* <NavLink onClick={handleClick} href="#" {...props}>Logout</NavLink> */}
            <Link className="nav-link nav-brand-text" onClick={handleClick} to="#" {...props}>Logout</Link>
        </React.Fragment>
    )
}

export default Logout