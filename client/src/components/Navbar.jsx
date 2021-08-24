import React from 'react'
import {NavLink} from 'react-router-dom'
const Navbar = () => {
    return (
        <nav>
            <NavLink to="/main/:name" activeClassName="selected">Main</NavLink>
            <NavLink to="/explore" activeClassName="selected">Explore</NavLink>
            <NavLink to="/humans" activeClassName="selected">Humans</NavLink>
        </nav>
    )
}

export default Navbar
