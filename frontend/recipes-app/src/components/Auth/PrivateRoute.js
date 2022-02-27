import React from "react";
import { Navigate, useLocation } from "react-router-dom";

import useToken from "./useToken";


const PrivateRoute = (props) => {
  const { token } = useToken();
  const { children } = props;
  const location = useLocation();
  
  return token && token !== "" && token !== undefined && token !== null ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/sign-in"
      state={{ from: `${location.pathname}${location.search}` }}
    />
  )
}

export default PrivateRoute;
