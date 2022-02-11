import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: #486582;
    height: 85px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.2rem calc((100vw) / 20);
    z-index: 12;
`;
export const NavLogo = styled(Link)`
  cursor: pointer;
  color: #fff;
  font-size: 2rem;
  text-decoration: none;
  &:hover {
    color: #ffe61c;
  }
`;

export const NavLink = styled(Link)`
    color: #fff;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &:hover {
    color: #ffe61c;
    }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: transparent;
  padding: 10px 22px;
  color: #fff;
  outline: none;
  border: 1px solid #fff;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

export const CloseToggle = styled(FaTimes)`
  position: fixed;
  top: 2.5%;
  right: 5%;
  color: #fff;
  display: flex;
  place-items: center;
  font-size: 2rem;
  cursor: pointer;
`

export const StyledToggle = styled(FaBars)`
  display: none;
  color: #fff;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
    background: #486582;
  }
`;

export const Ul = styled.ul`
    list-style: none;
    display: flex;
    flex-flow: row nowrap;
    li {
        padding: 18px 10px;
    }
    @media (max-width: 768px) {
        z-index: 2;
        flex-flow: column nowrap;
        background-color: #486582;
        position: fixed;
        top: 0;
        right: 0;
        height: 400px;
        width: 50vw;
        padding-top: 3.5rem;
        li {
            color: #fff;
        }
    }
    @media (max-width: 578px) {
        position: absolute;
        height: 350px;
        width: 100vw;
        padding-top: 1em;
        border-bottom: 4px solid #223140;
    }
`;