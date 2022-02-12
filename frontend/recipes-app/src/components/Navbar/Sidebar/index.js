import React from 'react';

import { 
    SidebarContainer,
    Icon,
    CloseIcon,
    SidebarWrapper,
    SideBtnWrap,
    SidebarRoute,
    SidebarMenu,
    SidebarLink
 } from './SidebarElements';

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
        <Icon onClick={toggle}>
            <CloseIcon />
        </Icon>
        <SidebarWrapper>
            <SidebarMenu>
                <SidebarLink to="recipes" onClick={toggle}>Recipes</SidebarLink>
                <SidebarLink to="create" onClick={toggle}>Create</SidebarLink>
                <SidebarLink to="sign-in" onClick={toggle}>Sign In</SidebarLink>
            </SidebarMenu>
            <SideBtnWrap>
                <SidebarRoute to="/sign-up" onClick={toggle}>Sign Up</SidebarRoute>
            </SideBtnWrap>
        </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar