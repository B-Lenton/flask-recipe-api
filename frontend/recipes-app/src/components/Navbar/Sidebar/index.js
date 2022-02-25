import React from 'react';
import Logout from '../../pages/Logout';
import useToken from '../../Auth/useToken';

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

const Sidebar = ({ isOpen, toggle, token }) => {

  const { removeToken } = useToken();

  return (
    <SidebarContainer isOpen={isOpen} onClick={toggle}>
      <Icon onClick={toggle}>
        <CloseIcon />
      </Icon>
      <SidebarWrapper>
        <SidebarMenu>
          <SidebarLink 
            to="recipes" 
            onClick={toggle}
          >
            Recipes
          </SidebarLink>
          {token && token !== "" && token !== undefined && (
            <SidebarLink 
              to="create" 
              onClick={toggle}
            >
              Create
            </SidebarLink>
          )}
          {!token && (
            <SidebarLink 
              to="sign-in" 
              onClick={toggle}
            >
              Sign In
            </SidebarLink>
          )}
        </SidebarMenu>
        <SideBtnWrap>
          {!token && (
            <SidebarRoute 
              to="/sign-up" 
              onClick={toggle}
            >
              Sign Up
            </SidebarRoute>
          )}
          {token && token !== "" && token !== undefined && (
            <Logout token={removeToken} />
          )}
        </SideBtnWrap>
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar;