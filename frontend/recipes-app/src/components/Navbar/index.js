import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLink, NavBtn, NavBtnLink } from "./NavbarElements";
import Logout from "../pages/Logout";
import useToken from "../Auth/useToken";


const Navbar = ({ toggle, token }) => {
    const [scrollNav, setScrollNav] = useState(false);

    const changeNav = () => {
        if(window.scrollY >= 80) {
            setScrollNav(true);
        } else {
            setScrollNav(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", changeNav)
    }, []);

    const { removeToken } = useToken();

    return (
        <>
            <IconContext.Provider value={{ color: "#fff" }}>
                <Nav scrollNav={scrollNav}>
                    <NavbarContainer>
                        <NavLogo to="/">Real Recipes</NavLogo>
                        <MobileIcon onClick={toggle}>
                            <FaBars />
                        </MobileIcon>
                        <NavMenu>
                            <NavItem>
                                <NavLink to="recipes">Recipes</NavLink>
                            </NavItem>
                            {token && token !== "" && token !== undefined && (
                                <NavItem>
                                    <NavLink to="create">Create</NavLink>
                                </NavItem>
                            )}
                            {!token && (
                                <NavItem>
                                    <NavLink to='sign-in'>Sign In</NavLink>
                                </NavItem>
                            )}
                        </NavMenu>
                        <NavBtn>
                            {!token && (
                                <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
                            )}
                            {token && token !== "" && token !== undefined && (
                                <Logout token={removeToken}/>
                            )}
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;