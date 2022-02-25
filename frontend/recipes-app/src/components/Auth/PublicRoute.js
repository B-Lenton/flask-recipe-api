import React from "react";
import { Navigate } from "react-router-dom";

import useToken from "./useToken";

const PublicRoute = (props) => {
  const { token } = useToken();
  const { children } = props
  
  return !token || token == "" || token == undefined || token == null ? (
    <>{children}</>
  ) : (
    <Navigate
      replace={true}
      to="/recipes"
    />
  )
}

export default PublicRoute;
