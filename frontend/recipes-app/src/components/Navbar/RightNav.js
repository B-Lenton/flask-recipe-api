import React from 'react';

import {
    Nav,
    NavLogo,
    NavLink,
    StyledToggle,
    NavMenu,
    NavBtn,
    NavBtnLink,
    CloseToggle,
    Ul
} from "./NavbarElements";

const RightNav = ({handleNavToggle}) => {
    return (
        <Ul>
            <CloseToggle onClick={handleNavToggle}/>
            <NavLink 
                  to="/" 
                  activestyle={{ color:'#ffe61c' }}
                  style={{height: "initial", padding: "30px 0", fontSize: "20px"}}
                >
                    Home
                </NavLink>
                <NavLink 
                  to="/create" 
                  activestyle={{ color: '#ffe61c' }}
                  style={{height: "initial", padding: "30px 0", fontSize: "20px"}}
                >
                    Create
                </NavLink>
                {/* <NavLink 
                  to="/contact" 
                  activestyle={{ color: '#ffe61c' }}
                >
                    Contact
                </NavLink> */}
                <NavLink 
                  to="/sign-in" 
                  activestyle={{ color: '#ffe61c' }}
                  style={{height: "initial", padding: "30px 0", fontSize: "20px"}}
                >
                    <span>Sign In</span>
                    <NavBtnLink style={{position: "absolute", right: "50px", fontSize: "20px"}} to="/sign-up">Sign Up</NavBtnLink>                
                </NavLink>
        </Ul>
    )
}

export default RightNav;