import React from "react";

import {
    Nav,
    NavLogo,
    NavLink,
    StyledToggle,
    NavMenu,
    NavBtn,
    NavBtnLink,
} from "./NavbarElements";


const Navbar = ({handleNavToggle}) => {
    return (
        <>
           <Nav>
            <NavLogo 
                to="/"
                activestyle={{ color: '#ffe61c' }}
            >
                Real Recipes
            </NavLogo>
            <StyledToggle onClick={handleNavToggle}/>

            <NavMenu>
                <NavLink 
                  to="/" 
                  activestyle={{ color:'#ffe61c' }}
                >
                    Home
                </NavLink>
                <NavLink 
                  to="/create" 
                  activestyle={{ color: '#ffe61c' }}
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
                >
                    Sign In
                </NavLink>
                <NavBtn>
                    <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>                
                </NavBtn>
            </NavMenu> 
           </Nav> 
        </>
    );
};

export default Navbar;
