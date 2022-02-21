import React, { useEffect, useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { IconContext } from 'react-icons/lib';
import { Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu, NavItem, NavLink, NavBtn, NavBtnLink } from "./NavbarElements";
import Header from "../Auth/Header";
import useToken from "../Auth/useToken";


const Navbar = ({ toggle }) => {
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
                            <NavItem>
                                <NavLink to="create">Create</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to='sign-in'>Sign In</NavLink>
                            </NavItem>
                        </NavMenu>
                        <NavBtn>
                            // TODO: below (and sign in above) should be either or (depending on token):
                            <NavBtnLink to="/sign-up">Sign Up</NavBtnLink>
                            <Header token={removeToken}/>
                        </NavBtn>
                    </NavbarContainer>
                </Nav>
            </IconContext.Provider>
        </>
    )
}

export default Navbar;