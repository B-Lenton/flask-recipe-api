import React from 'react';

import { CloseToggle, Ul } from "./NavbarElements";

const RightNav = ({handleNavToggle}) => {
  return (
      <Ul>
        <CloseToggle onClick={handleNavToggle}/>
      <li>Home</li>
      <li>About Us</li>
      <li>Contact Us</li>
      <li>Sign In</li>
      <li>Sign Up</li>
    </Ul>
  )
}

export default RightNav;